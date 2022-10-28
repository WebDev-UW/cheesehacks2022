const express = require('express')
const { reject } = require('lodash')
const db = require('../../../db')
const updateQueryGenerator = require('../../../updateQuery')
const columnNames = require('./columnNames')

const router = express.Router()

router.get('/', (req, res) => {
    // #swagger.tags = ["user-utility/self"]
    // #swagger.summary = "Load information about yourself"
    //console.log(req.session.passport)
    if (req.session && req.session.passport && req.session.passport.user.id) {
        db.query(`SELECT * FROM user_entry WHERE id = ?`, [req.session.passport.user.id], (err, rows) => {
            err ? res.sendStatus(401) : res.json(rows)
        })
    } else {
        res.sendStatus(404)
    }
})

router.put('/', (req, res) => {
    // #swagger.tags = ['user-utility/self']
    // #swagger.summary = "Modify information about yourself"
    console.log(req.session)
    if (req.session.passport && req.session.passport.user.id && req.body) {
        const clientInfo = req.body
        delete clientInfo.admin
        delete clientInfo.google_id
        delete clientInfo.created_datetime
        delete clientInfo.lastmodified_datetime
        clientInfo.id = req.session.passport.user.id
        const {query, values} = updateQueryGenerator('user_entry', columnNames, clientInfo)
        console.log('query: ', query)
        console.log('values: ', values)
        db.query(query, values, (err, rows) => {
            if (err) {
                console.log(err)
                res.status(500).json({err: err})
            } else {
                //req.session.passport.user = rows[0]
                res.json(rows)
            }
        })
    } else {
        res.sendStatus(400)
    }
})

module.exports = router