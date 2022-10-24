const db = require("../../../db")

/**
 * 
 * @returns Promise that resolves to a JSON array containing a value of the number of teams in the database
 */
function getStats() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(id) AS count_of_teams FROM team_entry;`, [], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

module.exports = {getStats}