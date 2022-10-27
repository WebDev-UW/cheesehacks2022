const db = require("../../../db")

/**
 * 
 * @param {Integer} team_id 
 * @param {Integer} user_id 
 * @returns Promise that resolves to information about the updated row
 */
function linkUserToTeam(team_id, user_id) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE user_entry SET team = ? WHERE id = ?`, [team_id, user_id], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

/**
 * 
 * @param {Integer} team_id 
 * @returns Promise that resolves to the team_captian
 */
function getCaptainOfTeam(team_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT team_captain FROM team_entry WHERE id = ?', [team_id], (err, rows) => {
            err ? reject(err) : resolve(rows[0])
        })
    })
}

module.exports = {linkUserToTeam, getCaptainOfTeam}