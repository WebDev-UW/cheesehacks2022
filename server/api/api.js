const express = require('express')
const userUtilityRouter = require('./user-utility/router')
const teamUtilityRouter = require('./team-utility/router')
const submissionRouter = require('./submission-utility/router')
const fileRouter = require('./files')

const router = express.Router()

router.use(express.json())

router.use('/user-utility', userUtilityRouter)
router.use('/team-utility', teamUtilityRouter)
router.use('/submission-utility', submissionRouter)
router.use('/files', fileRouter)

router.get('/', (req, res, next) => {
    res.redirect('/docs')
})

module.exports = router