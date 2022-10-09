const express = require('express')
const { getAllUsers } = require('./functions')

const router = express.Router()

router.get('/', (req, res, next) => {
    // #swagger.tags = ['user-utility/user']
    // #swagger.summary = 'Returns all users in a JSON Array'
    // #swagger.description = 'Queries the user_entry database and returns all users without any related information.'
    getAllUsers()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        next(err)
    })
})



module.exports = router