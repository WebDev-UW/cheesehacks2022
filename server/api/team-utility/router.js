const express = require('express')
const teamRouter = require('./team/router')
const statsRouter = require('./stats/router')
const linkRouter = require('./link/router')

const router = express.Router()

router.use('/team', teamRouter)
router.use('/stats', statsRouter)
router.use('/link', linkRouter)

module.exports = router