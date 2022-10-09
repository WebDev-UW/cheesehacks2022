const express = require('express')
const teamRouter = require('./team/router')

const router = express.Router()

router.use('/team', teamRouter)

module.exports = router