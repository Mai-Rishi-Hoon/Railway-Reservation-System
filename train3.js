const mysql = require('mysql');
const fs = require('fs');
const http = require('http');
const path = require('path');

// Creating a Server
const server = http.createServer((req, res) => {
  // Mapping file extensions to their corresponding content types
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    // Add more file types if needed
  };

  const filePath = path.join(__dirname, 'RRS', req.url);

  // Check if the path is a directory and handle it appropriately
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    res.writeHead(403, { 'Content-type': 'text/plain' });
    res.end('Forbidden: Directories cannot be read.');
    return;
  }

  // Reading and serving HTML, CSS, and image files
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('Not Found');
      } else {
        res.writeHead(500, { 'Content-type': 'text/html' });
        res.end('Internal Server Error !!!');
      }
      return;
    }

    const extname = path.extname(filePath);
    res.writeHead(200, { 'Content-type': contentTypes[extname] || 'text/html' });
    res.end(data);
  });

  // The rest of your code...
});

const port = 3000;
server.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
