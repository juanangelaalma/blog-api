const connection = require('./connection')

connection.connect(error => {
    if(error) throw error;
})

const sql = 'CREATE TABLE post (id INT(16) PRIMARY KEY, title VARCHAR(25) NOT NULL, content TEXT, image TEXT)'

connection.query(sql, (error, result) => {
    if(error) throw error
    console.log('table post created')
})


