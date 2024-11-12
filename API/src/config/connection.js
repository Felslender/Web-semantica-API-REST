const mysql = require('mysql2/promise')

require('dotenv').config();

try {
    const connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    });
    
    module.exports = connection;
} catch (error) {
    console.log("erro no banco de dados")
    return res.status(500).json({ status: 2 });
};

