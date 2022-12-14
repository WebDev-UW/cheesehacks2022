const db = require("../../../db")

/**
 * 
 * @returns Promise that resolves to a JSON array containing a value of the number of users in the database
 */
function getStats(registered) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(id) AS count_of_users FROM user_entry ${registered ? `WHERE registered = 1` : ``};`, [], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

module.exports = {getStats}