const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables from .env if present
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const BASE_DIR = path.join(__dirname, 'nadafpinjar');

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rakesh_rk:Rakesh2005@faceauth.jvni6bv.mongodb.net/nadaf_census?appName=faceauth';

mongoose.connect(MONGO_URI)
  .then(() => console.log('\n✅ MongoDB Connected successfully'))
  .catch(err => console.error('\n❌ MongoDB Connection Error:', err));

// Define Donation Schema & Model
const donationSchema = new mongoose.Schema({
  paymentId: String,
  formType: String,
  amount: Number,
  formData: mongoose.Schema.Types.Mixed,
  date: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// MIME types mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml'
};

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse path to support query parameters in route matches
  const parsedUrl = new URL(req.url, 'http://localhost');
  const reqPath = parsedUrl.pathname;

  if (req.method === 'GET' && reqPath === '/api/donations') {
    try {
      if (!mongoose.connection || mongoose.connection.readyState !== 1) {
        console.log('Reconnecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
      }
      const donations = await Donation.find({}).sort({ date: -1 });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, donations }));
    } catch (err) {
      console.error('Error fetching donations:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  if (req.method === 'POST' && reqPath === '/api/donations/update') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        if (!mongoose.connection || mongoose.connection.readyState !== 1) {
          console.log('Reconnecting to MongoDB...');
          await mongoose.connect(MONGO_URI);
        }
        const data = JSON.parse(body);
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
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Donation updated' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Donation not found' }));
        }
      } catch (err) {
        console.error('Error updating donation:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  if (req.method === 'GET' && reqPath === '/api/settings') {
    try {
      if (!mongoose.connection || mongoose.connection.readyState !== 1) {
        await mongoose.connect(MONGO_URI);
      }
      const setting = await Donation.findOne({ paymentId: "settings_pratibha_marquee" });
      const sadhakaSetting = await Donation.findOne({ paymentId: "settings_sadhaka_marquee" });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true, 
        enabled: setting ? setting.formData.enabled : true,
        sadhakaMarqueeEnabled: sadhakaSetting ? sadhakaSetting.formData.sadhakaMarqueeEnabled : true
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  if (req.method === 'POST' && reqPath === '/api/settings') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        if (!mongoose.connection || mongoose.connection.readyState !== 1) {
          await mongoose.connect(MONGO_URI);
        }
        const data = JSON.parse(body);
        
        if (data.enabled !== undefined) {
          let setting = await Donation.findOne({ paymentId: "settings_pratibha_marquee" });
          if (!setting) {
            setting = new Donation({
              paymentId: "settings_pratibha_marquee",
              formType: "settings",
              formData: { enabled: data.enabled }
            });
          } else {
            setting.formData = { enabled: data.enabled };
            setting.markModified('formData');
          }
          await setting.save();
        }

        if (data.sadhakaMarqueeEnabled !== undefined) {
          let sadhakaSetting = await Donation.findOne({ paymentId: "settings_sadhaka_marquee" });
          if (!sadhakaSetting) {
            sadhakaSetting = new Donation({
              paymentId: "settings_sadhaka_marquee",
              formType: "settings",
              formData: { sadhakaMarqueeEnabled: data.sadhakaMarqueeEnabled }
            });
          } else {
            sadhakaSetting.formData = { sadhakaMarqueeEnabled: data.sadhakaMarqueeEnabled };
            sadhakaSetting.markModified('formData');
          }
          await sadhakaSetting.save();
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Settings saved' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && reqPath === '/api/donations') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        if (!mongoose.connection || mongoose.connection.readyState !== 1) {
          console.log('Reconnecting to MongoDB...');
          await mongoose.connect(MONGO_URI);
        }
        const data = JSON.parse(body);
        const newDonation = new Donation(data);
        await newDonation.save();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Donation saved', id: newDonation._id }));
      } catch (err) {
        console.error('Error saving donation:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // DELETE donation by paymentId or dbId
  if (req.method === 'DELETE' && (reqPath.startsWith('/api/donations/') || reqPath === '/api/donations')) {
    let paymentId = '';
    let dbId = parsedUrl.searchParams.get('dbId');
    
    if (reqPath.startsWith('/api/donations/')) {
      paymentId = decodeURIComponent(reqPath.replace('/api/donations/', ''));
    } else {
      paymentId = parsedUrl.searchParams.get('paymentId');
    }

    if (!paymentId && !dbId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'paymentId or dbId is required' }));
      return;
    }

    try {
      if (!mongoose.connection || mongoose.connection.readyState !== 1) {
        await mongoose.connect(MONGO_URI);
      }
      
      let result = null;
      if (dbId && mongoose.Types.ObjectId.isValid(dbId)) {
        result = await Donation.findByIdAndDelete(dbId);
      }
      if (!result && paymentId) {
        result = await Donation.findOneAndDelete({ paymentId: paymentId });
      }

      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Donation deleted' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Donation not found' }));
      }
    } catch (err) {
      console.error('Error deleting donation:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  let filePath = reqPath === '/' ? '/default.html' : reqPath;
  let fullPath = path.join(BASE_DIR, filePath);

  // Support clean URLs by checking if .html file exists
  let ext = path.extname(fullPath).toLowerCase();
  if (!ext) {
    if (fs.existsSync(fullPath + '.html')) {
      fullPath += '.html';
      ext = '.html';
    }
  }

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}!`);
  console.log(`\n📂 Serving files from: ${BASE_DIR}`);
  console.log(`\n🛑 Press Ctrl+C to stop the server\n`);
});
