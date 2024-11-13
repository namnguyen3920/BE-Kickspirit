const mysql = require("mysql2/promise");
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DB,
    queueLimit: 0,    
    connectionLimit : 1000,
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Connection Successfully!!! ');
        connection.release();
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
}



testConnection();

module.exports = pool;