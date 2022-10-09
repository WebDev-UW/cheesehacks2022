const express = require('express')
const db = require('../../../db')

const router = express.Router()

router.get('/', (req, res) => {
    // #swagger.tags = ["user-utility/self"]
    // #swagger.summary = "Load information about yourself"
    console.log(req.session.passport)
    if (req.session && req.session.passport && req.session.passport.user.id) {
        db.query(`SELECT * FROM user_entry WHERE id = ?`, [req.session.passport.user.id], (err, rows) => {
            err ? res.sendStatus(401) : res.json(rows)
        })
    } else {
        res.sendStatus(404)
    }
})

module.exports = router