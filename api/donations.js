const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rakesh_rk:Rakesh2005@faceauth.jvni6bv.mongodb.net/?appName=faceauth';

async function connectToDatabase() {
  if (mongoose.connection && mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(MONGO_URI);
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

  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const donations = await Donation.find({}).sort({ date: -1 });
      return res.status(200).json({ success: true, donations });
    } catch (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      
      let data = req.body;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.error('Error parsing body string:', e);
        }
      }
      
      const newDonation = new Donation(data);
      await newDonation.save();
      return res.status(201).json({ success: true, message: 'Donation saved', id: newDonation._id });
    } catch (err) {
      console.error('Database save error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};
