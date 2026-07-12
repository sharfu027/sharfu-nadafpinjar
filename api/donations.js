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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const donations = await Donation.find({}).sort({ date: -1 });
      return res.status(200).json({ success: true, donations });
    }

    if (req.method === 'POST') {
      const bodyData = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const newDonation = new Donation(bodyData);
      await newDonation.save();
      return res.status(201).json({ success: true, message: 'Donation saved', id: newDonation._id });
    }

    if (req.method === 'DELETE') {
      const bodyData = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const paymentId = bodyData.paymentId || req.query.paymentId;
      if (!paymentId) {
        return res.status(400).json({ success: false, error: 'paymentId is required' });
      }
      const result = await Donation.findOneAndDelete({ paymentId: paymentId });
      if (result) {
        return res.status(200).json({ success: true, message: 'Donation deleted' });
      } else {
        return res.status(404).json({ success: false, error: 'Donation not found' });
      }
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
