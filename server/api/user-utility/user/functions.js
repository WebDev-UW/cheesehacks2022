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

/**
 * 
 * @param {Integer} id The ID of the user 
 * @returns Promise that resolves to a JSON array that contains the user object
 */
function getSpecificUser(id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user_entry WHERE id = ?`, [id], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

function getUserFromGoogleID(google_id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user_entry WHERE google_id = ?`, [google_id], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

function findOrCreateUser(profile) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user_entry WHERE google_id = ?`, [profile.id], (err, rows) => {
            if (err) {reject(err)}
            if (rows && rows.length > 0) {
                resolve(rows)
            } else {
                db.query(`INSERT INTO user_entry (google_id, first_name, last_name, profile_picture_url, email) VALUES (?, ?, ?, ?, ?)`, [profile.id, profile.name.givenName, profile.name.familyName, profile.photos[0].value, profile.emails[0].value], (err, rows) => {
                    if (err) {reject(err)} else {
                        getUserFromGoogleID(rows.insertId)
                        .then(user => {
                            resolve(user)
                        })
                        .catch(err => {
                            reject(err)
                        })
                    }
                })
            }
        })
    })
}

module.exports = {getAllUsers, findOrCreateUser, getSpecificUser}