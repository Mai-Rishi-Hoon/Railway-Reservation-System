const mysql = require('mysql');
 
// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'bkp6dfgw6yjsovpnwdie-mysql.services.clever-cloud.com',
  user: 'uglzmh6v4omyfibl',
  password: 'pC7YAt1eDmk5WQWPgTXC',
  port: '3306'
});

const Og = 126;
const Des = 104;

// Use the database
connection.connect((err) => {
  if (err) throw err;
  connection.query('USE bkp6dfgw6yjsovpnwdie', (err) => {
    if (err) throw err;

    const Search = () => {
      const sql1 = 'SELECT DISTINCT T.* FROM Train T WHERE T.Trainno IN ( SELECT TS1.Trainno FROM Trainstop TS1 WHERE TS1.Stationcode = 126 AND TS1.Trainno IN (SELECT TS2.Trainno FROM Trainstop TS2 WHERE TS2.Stationcode = 104))';
      connection.query(sql1, (err, results) => {
        if (err) throw err;
        console.log(results);
        connection.end();
      });
    };

    const Login = () => {
      const username = 'sarang';
      const password = 'sarang123';
      const email = 'sarang@gmail.com';
      const sql2 = 'SELECT Username FROM Login WHERE Username = "sarang" AND Password = "sarang123"';
      connection.query(sql2, (err, results) => {
        if (err) throw err;
        const rowcount = results.length;
        if (rowcount === 0) {
          console.log("Incorrect Username or Password !!!");
        } else {
          console.log("Welcome ", username, "!!!");
          Search();
        }
      });
    };

    const Signup = () => {
      const username = 'sarang';
      const password = 'sarang123';
      const email = 'sarang@gmail.com';
      const sql3 = 'INSERT INTO Login VALUES (?, ?, ?)';
      connection.query(sql3, [username, email, password], (err, results) => {
        if (err) throw err;
        console.log("Signup Successful !!!");
        Search();
      });
    };

    const Book = () => {
      const pname = 'Ramesh Shah';
      const page = 20;
      const pgender = 'M';
      const pcontactno = 1234567890;
      const bookingdate = '2023-11-17';
      const journeydate = '2023-12-15';
      const jclass = "CC";
      const price = 740;
      const pid = 1;
      const sstatus = 'confirmed';
      const trainno = 82902;
      const trainname = 'IRCTC Tejas Express';
      let seatno = '';

      function assignCoachNumber(jclass) {
        const classToCoachMap = {
          '3AC': { prefix: 'B', min: 1, max: 6 },
          '2AC': { prefix: 'A', min: 1, max: 3 },
          '1AC': { prefix: 'H', min: 1, max: 1 },
          'SL': { prefix: 'S', min: 1, max: 8 },
          '2C': { prefix: 'D', min: 1, max: 9 },
          'CC': { prefix: 'C', min: 1, max: 9 },
          'EC': { prefix: 'E', min: 1, max: 2 }
        };

        const normalizedClass = jclass.toUpperCase();

        if (classToCoachMap.hasOwnProperty(normalizedClass)) {
          const { prefix, min, max } = classToCoachMap[normalizedClass];
          const coachNumber = prefix + getRandomNumber(min, max);
          return coachNumber;
        } else {
          return 'Invalid Class';
        }
      }

      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

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
            callback(undefined);
            return;
          }
          const res = result.length;
          callback(res === 0);
        });
      }

      generateSeatno(trainno, assignCoachNumber(jclass), function (result) {
        if (result !== undefined) {
          console.log('Generated Seat No:', result);
          seatno = result;

          function generatePassengerId() {
            const timestamp = new Date().getTime();
            const random = Math.floor(Math.random() * 9000) + 1000;
            const passengerId = `${timestamp}${random}`.slice(0, 10);
            return passengerId;
          }

          const reservid = generatePassengerId();
          const coach = assignCoachNumber(jclass);

          const sql4 = 'INSERT INTO Passenger (PassId, Passname, Age, Gender, Contactno) VALUES (?,?,?,?,?)';
          connection.query(sql4, [pid, pname, page, pgender, pcontactno], (error, results) => {
            if (error) {
              console.error('Error executing INSERT query:', error);
            } else {
              console.log('Insert successful. Affected rows:', results.affectedRows);

              const sql5 = 'INSERT INTO Ticket (Reservationid, Trainno, Trainname, Bookingdate, Journeydate, Class, Status, Coach, Seat, Price, PassId) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
              connection.query(sql5, [reservid, trainno, trainname, bookingdate, journeydate, jclass, sstatus, coach, seatno, price, pid], (error, results) => {
                if (error) {
                  console.error('Error executing INSERT query:', error);
                } else {
                  console.log('Insert successful. Affected rows:', results.affectedRows);
                }
              });
            }
          });

        } else {
          console.log('Error generating seat number.');
        }
      });
    };


    const Cancel = () => {
      pnr = 1700243393;

      const sql7 = 'Select * from Ticket where Reservationid = ?';
      connection.query(sql7, [pnr], (err, results) => {
        if (err) throw err;
        console.log(results);
      const sql8 = 'Delete from Ticket where Reservationid = ?';
      connection.query(sql8, [pnr], (err, results) => {
        if (err) throw err;
        console.log("Ticket has been cancelled succesfully !!!");
        })
        // connection.close();
    })
    }

    const CheckBooking = () => {
      pid = 1;

      const sql8 = 'Select * from Ticket where Passid = ?';
      connection.query(sql8, [pid], (err, results) => {
        if (err) throw err;
        console.log(results);
        connection.end();
      })
    }
    // Uncomment the function you want to test
    Search();
    // Login();
    // Signup();
    // Book();
    // Cancel();
    // CheckBooking();
  });
});
