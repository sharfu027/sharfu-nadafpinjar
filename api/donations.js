module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = 'https://nadafpinjar-production.up.railway.app/api/donations';

  try {
    let fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (req.method === 'POST') {
      let bodyData = req.body;
      if (typeof bodyData !== 'string') {
        bodyData = JSON.stringify(bodyData);
      }
      fetchOptions.body = bodyData;
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('Vercel API proxy error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
