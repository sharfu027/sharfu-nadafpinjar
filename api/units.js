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

const customCatSchema = new mongoose.Schema({
  type: String, // 'category' or 'subCategory'
  name: String,
  date: { type: Date, default: Date.now }
});

const Unit = mongoose.models.Unit || mongoose.model('Unit', unitSchema);
const CustomCategory = mongoose.models.CustomCategory || mongoose.model('CustomCategory', customCatSchema);

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
      const { subUnit, action } = req.query;

      if (action === 'categories') {
        const customCategories = await CustomCategory.find({}).sort({ date: -1 });
        return res.status(200).json({ success: true, customCategories });
      }

      let filter = {};
      if (subUnit) {
        filter.subUnit = { $regex: new RegExp(`^${subUnit.replace(/[-_]/g, '\\s*')}$`, 'i') };
      }
      const units = await Unit.find(filter).sort({ date: -1 });
      const customCategories = await CustomCategory.find({}).sort({ date: -1 });
      return res.status(200).json({ success: true, units, customCategories });
    }

    if (req.method === 'POST') {
      const bodyData = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

      if (bodyData.action === 'addCategory') {
        const newCat = new CustomCategory({
          type: bodyData.type || 'category',
          name: bodyData.name || '',
          date: new Date()
        });
        await newCat.save();
        return res.status(201).json({ success: true, message: 'Custom category saved', category: newCat });
      }

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
      const { id, catId } = req.query;
      if (catId) {
        await CustomCategory.findByIdAndDelete(catId);
        return res.status(200).json({ success: true, message: 'Custom category deleted' });
      }
      if (id) {
        await Unit.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Unit record deleted' });
      }
      return res.status(400).json({ success: false, error: 'ID or catId is required' });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (err) {
    console.error('API Units Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
