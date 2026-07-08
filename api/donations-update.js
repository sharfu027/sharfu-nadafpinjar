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

const donationSchema = new mongoose.Schema({
  paymentId: String,
  formType: String,
  amount: Number,
  formData: mongoose.Schema.Types.Mixed,
  date: { type: Date, default: Date.now }
});

const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { paymentId, status, remarks, formData } = data;

    const donation = await Donation.findOne({ paymentId });
    if (donation) {
      if (!donation.formData) donation.formData = {};
      if (status !== undefined) donation.formData.status = status;
      if (remarks !== undefined) donation.formData.remarks = remarks;
      if (formData !== undefined) {
        donation.formData = { ...donation.formData, ...formData };
      }
      donation.markModified('formData');
      await donation.save();
      return res.status(200).json({ success: true, message: 'Donation updated' });
    } else {
      return res.status(404).json({ success: false, error: 'Donation not found' });
    }
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
