const express = require('express')
const teamRouter = require('./team/router')
const statsRouter = require('./stats/router')

const router = express.Router()

router.use('/team', teamRouter)
router.use('/stats', statsRouter)

module.exports = router