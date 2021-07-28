const mysql = require('mysql');

// ! config for connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog"
});


module.exports = connection;