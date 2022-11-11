const db = require("../../../db")

function insertSubmission(team_id, file_location, user_id) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO Submissions (team_id, created_timestamp, file_location, user_id) VALUES (?, ?, ?, ?)`, [team_id, Date.now(), user_id, file_location], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

function getSubmissionDetails() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Submissions', [team_id], (err, rows) => {
            err ? reject(err) : resolve(rows[0])
        })
    })
}

module.exports = {insertSubmission, getSubmissionDetails}