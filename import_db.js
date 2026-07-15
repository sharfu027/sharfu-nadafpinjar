const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nadaf_census';
const backupDir = path.resolve(__dirname, 'database/backups');

async function run() {
  if (!fs.existsSync(backupDir)) {
    console.error(`Backup directory not found at ${backupDir}`);
    process.exit(1);
  }

  console.log("Connecting to MongoDB database...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const files = fs.readdirSync(backupDir).filter(f => f.endsWith('_backup.json'));
  console.log(`Found ${files.length} backup files.`);

  for (const file of files) {
    const colName = path.basename(file, '_backup.json');
    const filePath = path.join(backupDir, file);
    console.log(`Importing to collection: ${colName}...`);

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!Array.isArray(data) || data.length === 0) {
      console.log(`No documents to import for ${colName}.`);
      continue;
    }

    const collection = db.collection(colName);
    
    // Clear existing data first
    console.log(`Clearing collection ${colName}...`);
    await collection.deleteMany({});

    // Parse date fields if any, and restore BSON ObjectIds
    const parsedData = data.map(doc => {
      const restored = { ...doc };
      if (restored._id) {
        if (typeof restored._id === 'string') {
          restored._id = new mongoose.Types.ObjectId(restored._id);
        } else if (restored._id.$oid) {
          restored._id = new mongoose.Types.ObjectId(restored._id.$oid);
        }
      }
      
      const parseDatesAndIds = (obj) => {
        for (const key in obj) {
          if (obj[key] && typeof obj[key] === 'object') {
            if (obj[key].$oid) {
              obj[key] = new mongoose.Types.ObjectId(obj[key].$oid);
            } else if (obj[key].$date) {
              obj[key] = new Date(obj[key].$date);
            } else {
              parseDatesAndIds(obj[key]);
            }
          } else if (typeof obj[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj[key])) {
            const date = new Date(obj[key]);
            if (!isNaN(date.getTime())) {
              obj[key] = date;
            }
          }
        }
      };
      parseDatesAndIds(restored);

      return restored;
    });

    console.log(`Inserting ${parsedData.length} documents into ${colName}...`);
    await collection.insertMany(parsedData);
    console.log(`Successfully imported ${colName}.`);
  }

  await mongoose.disconnect();
  console.log("Database import completed successfully!");
}

run().catch(console.error);
