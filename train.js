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

  // Use the database
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


    const Book = () => {
      pname = 'Ramesh Shah';
      
      page = 20;
      pgender = 'M';
      pcontactno = 1234567890;
      // ticketno = '';
      bookingdate = '2023-11-17';
      journeydate = '2023-12-15';
      jclass = "CC";
      price = 740;
      pid = 1;
      // coach = '';
      // seatno = '';
      sstatus = 'confirmed';
      trainno = 82902;
      trainname = 'IRCTC Tejas Express';

      function assignCoachNumber(jclass) {
        // Valid classes and corresponding coach ranges
        const classToCoachMap = {
          '3AC': { prefix: 'B', min: 1, max: 6 },
          '2AC': { prefix: 'A', min: 1, max: 3 },
          '1AC': { prefix: 'HA', min: 1, max: 1 },
          'SL': { prefix: 'S', min: 1, max: 8 },
          '2C': { prefix: 'D', min: 1, max: 9 },
          'CC': { prefix: 'C', min: 1, max: 9 },
          'EC': { prefix: 'E', min: 1, max: 2 }
          // Add more classes and coach ranges as needed
        };
      
        // Convert the class to uppercase for case-insensitivity
        const normalizedClass = jclass.toUpperCase();
      
        // Check if the provided class is valid
        if (classToCoachMap.hasOwnProperty(normalizedClass)) {
          // Get the coach range for the specified class
          const { prefix, min, max } = classToCoachMap[normalizedClass];
      
          // Generate a random coach number within the specified range
          const coachNumber = prefix + getRandomNumber(min, max);
      
          return coachNumber;
        } else {
          // Handle invalid class
          return 'Invalid Class';
        }
      }

      // Helper function to generate a random number within a range
      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Function to generate a seatno
      // Function to generate a seatno
      function generateSeatno(trainno, coach, callback) {
        const sn = Math.floor(Math.random() * (64 - 1 + 1)) + 1;
        check(sn, trainno, coach, function (isValid) {
          if (isValid || isValid === undefined) {
            callback(sn);
          } else {
            generateSeatno(trainno, coach, callback);
          }
        });
      }
      
      function check(sn, trainno, coach, callback) {
        const sql6 = 'SELECT * FROM Ticket WHERE Trainno = ? AND Coach = ? AND Seat = ?';
        connection.query(sql6, [trainno, coach, sn], function (err, result) {
          if (err) {
            console.error('Error executing query:', err);
            callback(undefined);  // Pass undefined to indicate an error
            return;
          }
          const res = result.length;
          callback(res === 0);
        });
      }
      
      // Example of using generateSeatno
      generateSeatno('your_train_no', 'your_coach_type', function (result) {
        if (result !== undefined) {
          console.log('Generated Seat No:', result);
        } else {
          console.log('Error generating seat number.');
        }
      });
      





      function generatePassengerId() {
        // Generate a timestamp (current time in milliseconds)
        const timestamp = new Date().getTime();
      
        // Generate a random number (between 1000 and 9999)
        const random = Math.floor(Math.random() * 9000) + 1000;
      
        // Combine timestamp and random number to create a unique ID
        const passengerId = `${timestamp}${random}`;
      
        return passengerId;
      }      

      reservid = generatePassengerId();
      coach = assignCoachNumber(jclass);
      seatno = generateSeatno(trainno, coach);

      const sql4 = 'INSERT INTO Passenger (PassId, Passname, Age, Gender, Contactno) VALUES (?,?,?,?,?)';
      connection.query(sql4, [pid, pname, page, pgender, pcontactno], (error, results) => {
        if (error) {
          console.error('Error executing INSERT query:', error);
        } else {
          console.log('Insert successful. Affected rows:', results.affectedRows);
        }
    })

    const sql5 = 'INSERT INTO Ticket (Reservationid, Trainno, Trainname, Bookingdate, Journeydate, Class, Coach, Seat, Price,	PassId) VALUES (?,?,?,?,?,?,?,?,?,?)';
      connection.query(sql5, [reservid, trainno, trainname, bookingdate, journeydate, jclass, coach,seatno, price, pid], (error, results) => {
        if (error) {
          console.error('Error executing INSERT query:', error);
        } else {
          console.log('Insert successful. Affected rows:', results.affectedRows);
        }
    })


   
    
  }
  //Search();
  //Login();
  //Signup()
  Book();
});
});
