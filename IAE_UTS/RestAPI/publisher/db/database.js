require('dotenv').config();

const mysql = require('mysql2');

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DBNAME:", process.env.DB_DBNAME);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
        connection.release();
    }
});

module.exports = pool.promise();
