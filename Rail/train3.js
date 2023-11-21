const mysql = require('mysql');
const fs = require('fs');
const http = require('http');
const path = require('path');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'bkp6dfgw6yjsovpnwdie-mysql.services.clever-cloud.com',
  user: 'uglzmh6v4omyfibl',
  password: 'pC7YAt1eDmk5WQWPgTXC',
  port: '3306'
});
connection.query('USE bkp6dfgw6yjsovpnwdie', (err) => {
  if (err) throw err;
})
// Creating a Server
const server = http.createServer((req, res) => {
  // Get the URL path
  const urlPath = req.url === '/' ? '/homepage.html' : req.url;

  // Check if it's an API request or a static file request
  if (urlPath.startsWith('/api')) {
    console.log("not hereee")
    handleApiRequest(req, res);
  } else {
    console.log("hereee")
    serveStaticFile(req, res, urlPath);
  }
});

function serveStaticFile(req, res, urlPath) {
  // Mapping file extensions to their corresponding content types
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    // Add more file types if needed
  };

  // Combine the URL path with the directory path
  const filePath = path.join(__dirname, urlPath);

  // Reading and serving HTML, CSS, and image files
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-type': 'text/html' });
      res.end('Internal Server Error !!!');
      console.log(err);
      return;
    }

    const extname = path.extname(filePath);
    res.writeHead(200, { 'Content-type': contentTypes[extname] || 'text/html' });
    res.end(data);
  });
}

function handleApiRequest(req, res) {
  // Parse data from the request
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const data = JSON.parse(body);

    if (!data || !data.From || !data.To) {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Request' }));
      return;
    }

    const From = data.From;
    const To = data.To;

    // Select data from the table
    const sqll = 'SELECT DISTINCT T.* FROM Train T WHERE T.Trainno IN ( SELECT TS1.Trainno FROM Trainstop TS1 WHERE TS1.Stationcode = ? AND TS1.Trainno IN (SELECT TS2.Trainno FROM Trainstop TS2 WHERE TS2.Stationcode = ?))';
    connection.query(sqll, [From, To], (err, results) => {
      if (err) {
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
        console.error('Error in MySQL query:', err);
        return;
      }

      console.log(results);
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(results));
    });
  });
}

const port = 3000;
server.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
