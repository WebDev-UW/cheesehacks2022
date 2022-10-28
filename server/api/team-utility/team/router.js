const express = require('express')
const { getAllTeams, getTeam, createTeam, modifyTeam, deleteTeam } = require('./functions')

const router = express.Router()

router.get('/', (req, res) => {
    // #swagger.tags = ["team-utility/team"]
    // #swagger.summary = "Load all teams"
    console.log(req.session)
    getAllTeams()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

router.get('/:id', (req, res) => {
    // #swagger.tags = ["team-utility/team"]
    // #swagger.summary = "Load a single team"
    getTeam(req.params.id)
    .then(row => {
        res.json(row)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

router.post('/', (req, res) => {
    // #swagger.tags = ['team-utility/team']
    // #swagger.summary = 'Create a team'
    // #swagger.description = 'Uses information provided to create a new team.'
    /* #swagger.parameters['team'] = {
        in: 'body',
        description: 'Creating new team',
        schema: {
            name: 'The Best Team',
            description: 'We want to use javascript to win the biggest prize!',
            team_captain: 1
        }
    }*/
    /* #swagger.responses[201] = {
        description: "Successfully created new team."
    }
    */
    if (req.session.passport) {
        if (req.body) {
            let data = req.body
            //if not admin, team_captain must be user that initiated request
            if (!req.session.passport.user.admin === 1) {
                data.team_captain = req.session.passport.user.id
            } else {
                console.log('Admin created team')
            }
            createTeam(req.body)
            .then(row => {
                res.json(row)
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

router.put('/:id', (req, res) => {
    // #swagger.tags = ["team-utility/team"]
    // #swagger.summary = "Modify a team"
    // #swagger.description = "Allows the team captain of a team to modify their team. Admins can modify any team"
    /* #swagger.parameters['team'] = {
        in: 'body',
        description: 'Creating new team',
        schema: {
            name: 'The Best Team',
            description: 'We want to use javascript to win the biggest prize!',
            team_captain: 1
        }
    }*/
    //user must be logged in
    if (req.session.passport) {
        let data = req.body
        data.id = req.params.id

        //if user is not an admin, they must be the team captain to modify the team
        if (!req.session.passport.user.admin === 1) {
            getTeam(data.id)
            .then(team => {
                if (team[0].team_captain === req.session.passport.user.id) {
                    modifyTeam(data)
                    .then(row => {
                        res.json(row)
                    })
                    .catch(err => {
                        res.status(500).json({err: err})
                    })
                }
            })
            .catch(err => {
                res.status(500).json({err: err})
            })
        } else {

            //if the user is an admin, they can modify any team how they like
            console.log('User is an admin')
            modifyTeam(data)
            .then(row => {
                res.json(row)
            })
            .catch(err => {
                res.status(500).json({err: err})
            })
        }
    } else {
        res.sendStatus(401)
    }
})

router.delete('/:id', (req, res) => {
    if (!req.session.passport || !req.session.passport.user.id) {
        res.sendStatus(401)
    } else if (!req.params.id) {
        res.sendStatus(400)
    } else {
        getTeam(req.params.id)
        .then(teams => {
            if (parseInt(teams[0].team_captain) === parseInt(req.session.passport.user.id)) {
                deleteTeam(req.params.id)
                .then(deletion => {
                    res.sendStatus(204)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({err: err})
                })
            } else {
                res.sendStatus(403)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err: err})
        })
    }
})

module.exports = router