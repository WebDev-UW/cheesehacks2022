const express = require('express')
const { getAllUsers, getSpecificUser } = require('./functions')

const router = express.Router()

router.get('/', (req, res, next) => {
    // #swagger.tags = ['user-utility/user']
    // #swagger.summary = 'Returns all users in a JSON Array'
    // #swagger.description = 'Queries the user_entry database and returns all users without any related information.'
    const expanded = req.query.expanded
    getAllUsers(expanded)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['user-utility/user']
    // #swagger.summary = 'Returns specific user in a JSON Array'
    // #swagger.description = 'Queries the user_entry database and returns specific user without any related information.'
    if (!parseInt(req.params.id)) {
        res.sendStatus(400)
    } else {
        getSpecificUser(req.params.id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
    }
    
})



module.exports = router