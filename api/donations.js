const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rakesh_rk:Rakesh2005@faceauth.jvni6bv.mongodb.net/?appName=faceauth';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
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
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const newDonation = new Donation(req.body);
      await newDonation.save();
      return res.status(201).json({ success: true, message: 'Donation saved', id: newDonation._id });
    } catch (err) {
      console.error('Database save error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};
