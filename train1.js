const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'bkp6dfgw6yjsovpnwdie-mysql.services.clever-cloud.com',
  user: 'uglzmh6v4omyfibl',
  password: 'pC7YAt1eDmk5WQWPgTXC',
  port: '3306'
});

const Og="Bhuj";
const Des="Mumbai Central";

connection.connect((err) => {
  if (err) throw err;

  // Create the database
  connection.query('USE bkp6dfgw6yjsovpnwdie', (err) => {
    if (err) throw err;
    
    const Search = () => {
      // Select data from the table
      const sqll = 'SELECT DISTINCT T.* FROM Train T WHERE T.Trainno IN ( SELECT TS1.Trainno FROM Trainstop TS1 WHERE TS1.Stationcode = 126 AND TS1.Trainno IN (SELECT TS2.Trainno FROM Trainstop TS2 WHERE TS2.Stationcode = 104';
      
      connection.query(sqll, (err, results) => {
        if (err) throw err;
        console.log(results);

        // Close the connection after you've obtained the results
        connection.end();
      });
    }
    
    if (req.url === '/search' && req.post === 'POST'){
      Search();
    }

    else if (req.url === '/book' && req.post === 'POST'){
      Book();
    }
    
  });
});
