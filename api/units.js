const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rakesh_rk:Rakesh2005@faceauth.jvni6bv.mongodb.net/nadaf_census?appName=faceauth';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  cachedDb = await mongoose.connect(MONGO_URI);
  return cachedDb;
}

const unitSchema = new mongoose.Schema({
  subUnit: String, // 'State', 'Youth', 'Sub Committee', 'Foundation', 'Calendar'
  category: String,
  subCategory: String,
  subject: String,
  fileData: String, // Base64 or Data URL
  fileName: String,
  fileType: String,
  date: { type: Date, default: Date.now }
});

const Unit = mongoose.models.Unit || mongoose.model('Unit', unitSchema);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { subUnit } = req.query;
      let filter = {};
      if (subUnit) {
        // Match case-insensitively or normalized
        filter.subUnit = { $regex: new RegExp(`^${subUnit.replace(/[-_]/g, '\\s*')}$`, 'i') };
      }
      const units = await Unit.find(filter).sort({ date: -1 });
      return res.status(200).json({ success: true, units });
    }

    if (req.method === 'POST') {
      const bodyData = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const newUnit = new Unit({
        subUnit: bodyData.subUnit || 'State',
        category: bodyData.category || '',
        subCategory: bodyData.subCategory || '',
        subject: bodyData.subject || '',
        fileData: bodyData.fileData || '',
        fileName: bodyData.fileName || '',
        fileType: bodyData.fileType || '',
        date: bodyData.date ? new Date(bodyData.date) : new Date()
      });
      await newUnit.save();
      return res.status(201).json({ success: true, message: 'Unit record saved', id: newUnit._id, unit: newUnit });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'ID is required' });
      }
      await Unit.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Unit record deleted' });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (err) {
    console.error('API Units Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
