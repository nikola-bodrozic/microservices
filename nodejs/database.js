const mysql = require('mysql');

module.exports = mysql.createConnection({
  host: "dbmysql",
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: "sampledb"
});
