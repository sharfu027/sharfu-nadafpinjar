const https = require('https');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return new Promise((resolve) => {
    let bodyData = '';
    if (req.method === 'POST') {
      bodyData = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (req.method === 'POST') {
      headers['Content-Length'] = Buffer.byteLength(bodyData);
    }

    const options = {
      hostname: 'nadafpinjar-production.up.railway.app',
      port: 443,
      path: '/api/donations',
      method: req.method,
      headers: headers
    };

    const proxyReq = https.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
      resolve();
    });

    proxyReq.on('error', (err) => {
      console.error('HTTPS Proxy Error:', err);
      res.status(500).json({ success: false, error: err.message });
      resolve();
    });

    if (req.method === 'POST') {
      proxyReq.write(bodyData);
    }
    proxyReq.end();
  });
};
