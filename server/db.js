const mysql = require('mysql')
const db = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

module.exports = db

