const mysql = require('mysql');
const fs = require('fs');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
// const port = 3000;

app.use(bodyParser.json());

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'bkp6dfgw6yjsovpnwdie-mysql.services.clever-cloud.com',
  user: 'uglzmh6v4omyfibl',
  password: 'pC7YAt1eDmk5WQWPgTXC',
  port: '3306'
});

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

  

  const Og = "Vadodara";
  const Des = "Mumbai Central";

  

    // Create the database
    connection.query('USE bkp6dfgw6yjsovpnwdie', (err) => {
      if (err) throw err;

      const Search = () => {
        // Fetch Value from html
        // let From = document.getElementById("From").value;
        // let To = document.getElementById("To").value;
        if (!req.body || !req.body.From || !req.body.To) {
          res.status(400).json({ error: 'Bad Request' });
          return;
      } 
        let From = req.body.From;
        let To = req.body.To;

        // Select data from the table
        const sqll = 'SELECT DISTINCT T.* FROM Train T WHERE T.Trainno IN ( SELECT TS1.Trainno FROM Trainstop TS1 WHERE TS1.Stationcode = ? AND TS1.Trainno IN (SELECT TS2.Trainno FROM Trainstop TS2 WHERE TS2.Stationcode = ?))';
        connection.query(sqll,[From,To], (err, results) => {
          if (err) throw err;
          console.log(results);
          res.json(results);

          // Close the connection after you've obtained the results
          connection.end();
        });
      }
      // app.post('/Search', Search);
      app.post('/Search', (req, res) => Search(req, res));

      if (req.url === '/Search' && req.method === 'POST') {
        Search();
      }

      else if (req.url === '/book' && req.method === 'POST') {
        Book();
      }
    });
  });

  

const port = 3000;
server.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
