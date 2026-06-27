// Simple local dev server — no npm install needed
// Run with: node server.js
// Then open: http://localhost:8080

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.md': 'text/markdown',
};

http.createServer((req, res) => {
    let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
    // Strip query strings
    filePath = filePath.split('?')[0];

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found: ' + req.url);
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Cache-Control': 'no-cache',
        });
        res.end(data);
    });
}).listen(PORT, () => {
    console.log(`\n✅  Portfolio running at: http://localhost:${PORT}`);
    console.log(`   Press Ctrl+C to stop.\n`);
});
