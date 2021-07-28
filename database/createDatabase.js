const mysql = require('mysql')

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});


connection.connect(error => {
  if(error) throw error;
  connection.query('CREATE DATABASE blog', (err, results) => {
    if (err) throw err
    console.log("Database created")
  })
})
