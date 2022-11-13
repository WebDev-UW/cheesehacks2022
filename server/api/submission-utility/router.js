const express = require('express')
const { getSubmissionDetails, insertSubmission, getSubmissionDetailsOfTeam, getSubmissionsWithTeamInfo } = require('./functions')

const router = express.Router()

router.post('/', (req, res) => {
    // #swagger.tags = ['submission-utility']
    // #swagger.summary = 'Create new project submission'
    // #swagger.description = 'Create a new project submission for a team'
    if (req.session.passport && req.session.passport.user) {
        if (req.body.team_id && req.body.file_location && req.body.url) {
            insertSubmission(req.body.team_id, req.body.file_location, req.session.passport.user.id, req.body.url)
            .then(rows => {
                res.json(rows)
            })
            .catch(err => {
                res.status(500).json({err: err})
            })
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(401)
    } 
    
    
})

router.get('/:id', (req, res) => {
    if (parseInt(req.params.id)) {
        getSubmissionDetailsOfTeam(req.params.id)
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            res.status(500).json({err: err})
        })
    }
})

router.get('/', (req, res) => {
    // #swagger.tags = ['submission-utility']
    // #swagger.summary = 'Load all submissions'
    // #swagger.description = 'Loads all submissions that have been created on the website'
    if (req.query.withTeams) {
        getSubmissionsWithTeamInfo()
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            res.status(500).json({err: err})
        })
    } else {
        getSubmissionDetails()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
    }
    
})

module.exports = router