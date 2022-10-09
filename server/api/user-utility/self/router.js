const express = require('express')
const db = require('../../../db')

const router = express.Router()

router.get('/', (req, res) => {
    console.log(req.session.passport)
    if (req.session && req.session.passport && req.session.passport.user.id) {
        db.query(`SELECT * FROM user_entry WHERE id = ?`, [req.session.passport.user.id], (err, rows) => {
            err ? res.sendStatus(401) : res.json(rows)
        })
    }
})

module.exports = router