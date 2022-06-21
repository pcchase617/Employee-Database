const mysql = require("mysql2");
require('dotenv').config();
console.log(process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME)

const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = connection