const express = require('express')
const { getAllUsers } = require('./functions')

const router = express.Router()

router.get('/', (req, res, next) => {
    getAllUsers()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        next(err)
    })
})



module.exports = router