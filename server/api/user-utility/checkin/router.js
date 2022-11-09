const express = require("express");
const { reject } = require("lodash");
const db = require("../../../db");

const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.tags = ['user-utility/checkin']
  // #swagger.summary = 'Returns all checkins in a JSON Array'
  // #swagger.description = 'Queries the checkin_entry database and returns all checkins without any related information.'
  db.query(`SELECT * FROM checkin_entry;`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ err: err });
    } else {
      res.json(rows);
    }
  });
});

router.use((req, res, next) => {
  if (req.session.passport && req.session.passport.user.admin === 1) {
    next();
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req, res) => {
  // #swagger.tags = ['user-utility/checkin']
  // #swagger.summary = 'Create a new checkin'
  // #swagger.description = 'Creates a new checkin, using the provided user id in the body of the request'
  if (req.body && req.body.id) {
    db.query(
      `INSERT INTO checkin_entry (user_id, checkedin_by_id, notes) VALUES (?, ?, ?);`,
      [req.body.id, req.session.passport.user.id, req.body.notes],
      (err, rows) => {
        if (err) {
          res.status(500).json({ err: err });
        } else {
          res.status(201).json(rows);
        }
      }
    );
  }
});

module.exports = router