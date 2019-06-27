var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 5,
    multipleStatements: true,
    host    :'35.234.53.144',
    port : 80,
    user : 'root',
    password : 'hi123456',
    database:'momentdb', 
});

module.exports = pool;