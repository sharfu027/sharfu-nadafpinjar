const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const BASE_DIR = path.join(__dirname, 'nadafpinjar');

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://rakesh_rk:Rakesh2005@faceauth.jvni6bv.mongodb.net/?appName=faceauth';

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

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/donations') {
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

  if (req.method === 'POST' && req.url === '/api/donations') {
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

  let filePath = req.url === '/' ? '/default.html' : req.url;
  filePath = filePath.split('?')[0];
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
  console.log(`\n🚀 Server is running!`);
  console.log(`\n📂 Serving files from: ${BASE_DIR}`);
  console.log(`\n🛑 Press Ctrl+C to stop the server\n`);
});
