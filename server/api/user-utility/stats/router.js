const express = require('express')
const { getStats } = require('./functions')

const router = express.Router()

router.get('/', (req, res) => {
    // #swagger.tags = ["user-utility/stats"]
    // #swagger.summary = "Loads the number of users that are in the database"
    getStats()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

module.exports = router