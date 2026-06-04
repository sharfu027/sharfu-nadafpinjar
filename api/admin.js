const https = require('https');
const url = require('url');
const querystring = require('querystring');
const path = require('path');

const ORIGINAL_HOST = 'nadafpinjar.com';

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
    '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject',
    '.xml': 'application/xml', '.webp': 'image/webp', '.map': 'application/json'
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

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const parsedUrl = url.parse(req.url, true);
  
  // Extract path query parameter passed by Vercel rewrite
  const adminPath = parsedUrl.query.path || '';
  
  // Rebuild remaining query parameters to pass to the original server
  const queryObj = { ...parsedUrl.query };
  delete queryObj.path;
  const queryString = querystring.stringify(queryObj);

  // Handle logout
  if (adminPath === 'logout' || adminPath.endsWith('/logout')) {
    res.setHeader('Set-Cookie', [
      'ASP.NET_SessionId=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
      '.ASPXAUTH=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax'
    ]);
    res.writeHead(302, { 'Location': '/admin/' });
    return res.end();
  }

  const targetPath = adminPath || 'accountsummary';
  const fullPath = queryString ? `/${targetPath}?${queryString}` : `/${targetPath}`;

  const isAsset = targetPath.startsWith('assets/') ||
    targetPath.startsWith('fonts/') ||
    targetPath.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|webp|map)$/i);

  // Buffer request body for POST
  let reqBody = Buffer.alloc(0);
  if (req.method === 'POST') {
    const chunks = [];
    await new Promise((resolve) => {
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', () => {
        reqBody = Buffer.concat(chunks);
        resolve();
      });
    });
  }

  try {
    const reqHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': isAsset ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'identity',
      'Host': ORIGINAL_HOST,
      'Connection': 'keep-alive'
    };

    // Forward browser cookies directly to original site
    if (req.headers.cookie) {
      reqHeaders['Cookie'] = req.headers.cookie;
    }

    if (req.method === 'POST') {
      reqHeaders['Content-Type'] = req.headers['content-type'] || 'application/x-www-form-urlencoded';
      reqHeaders['Content-Length'] = reqBody.length;
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
        httpsReq.write(reqBody);
      }
      httpsReq.end();
    });

    // Forward response Set-Cookie headers back to browser
    const setCookies = response.headers['set-cookie'];
    if (setCookies) {
      const cookiesToSet = (Array.isArray(setCookies) ? setCookies : [setCookies]).map(c => {
        // Strip original domain and set path to /
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
      return res.end();
    }

    // Serve asset binary payloads
    if (isAsset) {
      const ct = response.headers['content-type'] || getContentType(targetPath);
      res.writeHead(response.statusCode, {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=86400'
      });
      return res.end(response.body);
    }

    // Serve HTML and text payload rewrites
    const contentType = response.headers['content-type'] || 'text/html';
    if (isTextContent(contentType) && contentType.includes('html')) {
      let html = response.body.toString('utf-8');
      html = rewriteHtml(html);
      res.writeHead(response.statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } else if (isTextContent(contentType)) {
      let text = response.body.toString('utf-8');
      if (contentType.includes('css')) {
        text = text.replace(/url\(\s*['"]*\//g, "url('/admin/");
        text = text.replace(/\/admin\/admin\//g, '/admin/');
        text = text.replace(/url\('\/admin\/\//g, "url('//");
      }
      res.writeHead(response.statusCode, { 'Content-Type': contentType });
      return res.end(text);
    } else {
      res.writeHead(response.statusCode, { 'Content-Type': contentType });
      return res.end(response.body);
    }

  } catch (err) {
    console.error('Stateless serverless proxy error:', err);
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`<h2>Admin Proxy Error</h2><p>${err.message}</p>`);
  }
};
