const db = require("../../../db");
const insertQueryGenerator = require("../../../insertQuery");
const updateQueryGenerator = require("../../../updateQuery");
const columnNames = require("./columnNames");

/**
 * Queries the database to return all teams
 * @returns Promise that resolves to a JSON array of all teams
 * @author Ryan S Werner
 */
function getAllTeams() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM team_entry;`, [], (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}

/**
 * Queries the database to return a single team
 * @param {Integer} id The team ID
 * @returns Promise that resolve to a JSON array of a single team
 * @author Ryan S Werner
 */
function getTeam(id) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM team_entry WHERE id = ?`, [id], (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}

/**
 * Using provided data from the body, will create a row for a new team
 * @param {Object} data A JSON Object containing the values to create the row with
 * @returns Promise that resolves with details about the inserted row
 * @author Ryan S Werner
 */
function createTeam(data) {
  return new Promise((resolve, reject) => {
    const { query, values } = insertQueryGenerator(
      "team_entry",
      columnNames,
      data
    );
    db.query(query, values, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}

/**
 * Will update the specified pieces of data in the row. Make sure to provide an ID in the object.
 * @param {Object} data A JSON object containing the values to replace
 * @returns Promise that resolves with details about the updated row
 * @author Ryan S Werner
 */
function modifyTeam(data) {
  return new Promise((resolve, reject) => {
    const { query, values } = updateQueryGenerator(
      "team_entry",
      columnNames,
      data
    );
    db.query(query, values, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}

module.exports = { getAllTeams, getTeam, createTeam, modifyTeam };
