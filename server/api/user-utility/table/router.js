const express = require('express')
const db = require('../../../db')

const router = express.Router()

router.use((req, res, next) => {
    if (req.session && req.session.passport && req.session.passport.user) {
        next()
    } else {
        res.sendStatus(403)
    }
})

router.get('/', (req, res) => {
    db.query(`DESC user_entry;`, [], (err, rows) => {
        if (err) {
            res.status(500).json({err: err})
        } else {
            res.json(rows)
        }
    })
})

module.exports = router