const db = require("../../../db");

/**
 * 
 * @returns Promise that resolves to a JSON array of all users
 */
function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user_entry`, [], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

module.exports = {getAllUsers}