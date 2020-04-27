var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 5,
    multipleStatements: true,
    host    :'34.64.157.217',
    port : 3306,
    user : 'root',
    password : 'hi123456',
    database:'momentdb', 
});

module.exports = pool;