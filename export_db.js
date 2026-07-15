const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nadaf_census';
const backupDir = path.resolve(__dirname, 'database/backups');

async function run() {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log("Connecting to MongoDB database...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // List all collections
  const collections = await db.listCollections().toArray();
  console.log(`Found ${collections.length} collections.`);

  for (const collectionInfo of collections) {
    const colName = collectionInfo.name;
    // Skip system/index collections if any
    if (colName.startsWith('system.')) continue;

    console.log(`Exporting collection: ${colName}...`);
    const collection = db.collection(colName);
    const documents = await collection.find({}).toArray();

    const filePath = path.join(backupDir, `${colName}_backup.json`);
    fs.writeFileSync(filePath, JSON.stringify(documents, null, 2), 'utf-8');
    console.log(`Saved ${documents.length} documents to ${filePath}`);
  }

  await mongoose.disconnect();
  console.log("Database backup completed successfully!");
}

run().catch(console.error);
