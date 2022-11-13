const db = require("../../db")


/**
 * 
 * @param {Number} team_id The id of the team
 * @param {String} file_location The file location
 * @param {Number} user_id The id of the user that is submitting the project
 * @returns Promise that resolves to information about the inserted row
 */
function insertSubmission(team_id, file_location, user_id, url) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO submission_entry (team_id, file_location, user_id, url) VALUES (?, ?, ?, ?)`, [team_id, file_location, user_id, url], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

/**
 * 
 * @returns Promise that resolves to all submission entry details
 */
function getSubmissionDetails() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM submission_entry', [], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

/**
 * 
 * @param {Number} team_id The id of the team that you would like to get submissions from 
 * @returns Promise that resolves to all submission data for your team
 */
function getSubmissionDetailsOfTeam(team_id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM submission_entry WHERE team_id = ?`, [team_id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

function getSubmissionsWithTeamInfo() {
    return new Promise((resolve, reject) => {
        db.query('SELECT team.*, COUNT(submission.team_id) AS count FROM team_entry AS team JOIN submission_entry AS submission ON team.id = submission.team_id GROUP BY team.id;', [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = {insertSubmission, getSubmissionDetails, getSubmissionDetailsOfTeam, getSubmissionsWithTeamInfo}