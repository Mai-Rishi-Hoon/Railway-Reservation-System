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

//   const filePath = path.join(__dirname,'Rail', req.url);
const filePath = path.join(__dirname, 'Rail', req.url === '/' ? 'homepage.html' : req.url);


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

  // Create a connection to the MySQL server
  const connection = mysql.createConnection({
    host: 'bkp6dfgw6yjsovpnwdie-mysql.services.clever-cloud.com',
    user: 'uglzmh6v4omyfibl',
    password: 'pC7YAt1eDmk5WQWPgTXC',
    port: '3306'
  });

  const Og = $From;
  const Des = "Mumbai Central";

  connection.connect((err) => {
    if (err) throw err;

    // Create the database
    connection.query('USE bkp6dfgw6yjsovpnwdie', (err) => {
      if (err) throw err;

      const Search = () => {
        // Select data from the table
        const sqll = 'SELECT DISTINCT T.* FROM Train T WHERE T.Trainno IN ( SELECT TS1.Trainno FROM Trainstop TS1 WHERE TS1.Stationcode = 126 AND TS1.Trainno IN (SELECT TS2.Trainno FROM Trainstop TS2 WHERE TS2.Stationcode = 104))';
        connection.query(sqll, (err, results) => {
          if (err) throw err;
          console.log(results);

          // Close the connection after you've obtained the results
          connection.end();
        });
      }

      if (req.url === '/search' && req.method === 'POST') {
        Search();
      }

      else if (req.url === '/book' && req.method === 'POST') {
        Book();
      }
    });
  });
});

const port = 3000;
server.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
