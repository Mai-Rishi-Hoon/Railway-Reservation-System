const mysql = require('mysql');



// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'bkp6dfgw6yjsovpnwdie-mysql.services.clever-cloud.com',
  user: 'uglzmh6v4omyfibl',
  password: 'pC7YAt1eDmk5WQWPgTXC',
  port: '3306'
});

const Og= 126;
const Des= 104;

connection.connect((err) => {
  if (err) throw err;

  // Create the database
  connection.query('USE bkp6dfgw6yjsovpnwdie', (err) => {
    if (err) throw err;
    
    const Search = () => {
      // Select data from the table
    
    
    const sql1 = 'SELECT DISTINCT T.* FROM Train T WHERE T.Trainno IN ( SELECT TS1.Trainno FROM Trainstop TS1 WHERE TS1.Stationcode = 126 AND TS1.Trainno IN (SELECT TS2.Trainno FROM Trainstop TS2 WHERE TS2.Stationcode = 104))';
      connection.query(sql1, (err, results) => {
        if (err) throw err;
        console.log(results);

        // Close the connection after you've obtained the results
        connection.end();
      });
    }


    
    const Login = () => {
     username = 'sarang';
     password = 'sarang123';
     email = 'sarang@gmail.com';

     const sql2 = 'Select Username from Login where Username = "sarang" and Password = "sarang123" ';
     connection.query(sql2, (err, results) => {
      if (err) throw err;
      // console.log(results);

      rowcount = results.length;
      if(rowcount == 0){
        console.log("Incorrect Username or Password !!!");
      }
      else{
        console.log("Welcome ",username,"!!!");
        Search();
      }
      // Close the connection after you've obtained the results
      // connection.end();
    });
    }


    const Signup = () => {
      username = 'sarang';
      password = 'sarang123';
      email = 'sarang@gmail.com';
 
      const sql3 = 'Insert into Login values ("sarang","sarang@gmail.com","sarang123")';
      connection.query(sql3, (err, results) => {
       if (err) throw err;
       console.log("Signup Succesfull !!!");
      Search ();
 

       // Close the connection after you've obtained the results
      //  connection.end();
     });
    }
   //Search();
   Login();
    
  });
});
