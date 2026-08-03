const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const handleRequest = (req, res) => {
    let rawUrl = req.url.split('?')[0];
    if (rawUrl === '/' || rawUrl === '') {
        rawUrl = '/default.html';
    }

    // Strip leading subpath prefix if static assets are requested relatively (e.g. /sadhaka/js/...)
    let cleanUrl = rawUrl;
    if (cleanUrl.includes('/js/') || cleanUrl.includes('/css/') || cleanUrl.includes('/images/') || cleanUrl.includes('/fonts/')) {
        const assetIndex = cleanUrl.search(/\/(js|css|images|fonts)\//);
        if (assetIndex !== -1) {
            cleanUrl = cleanUrl.substring(assetIndex);
        }
    }

    let filePath = path.join(__dirname, cleanUrl);

    // If cleanUrl has no extension, check if .html file exists
    if (!path.extname(cleanUrl)) {
        if (fs.existsSync(filePath + '.html')) {
            filePath = filePath + '.html';
        } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'default.html');
        }
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'text/html; charset=utf-8';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Return proper 404 for missing assets instead of default.html to avoid SyntaxError: Unexpected token '<'
                if (extname && extname !== '.html') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Asset Not Found: ' + rawUrl);
                    return;
                }
                const defaultPath = path.join(__dirname, 'default.html');
                fs.readFile(defaultPath, (err, html) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('404 Not Found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(html, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
};

const server = http.createServer(handleRequest);

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = handleRequest;
