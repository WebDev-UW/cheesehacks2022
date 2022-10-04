const express = require('express')
const userUtilityRouter = require('./user-utility/router')

const router = express.Router()

router.use('/user-utility', userUtilityRouter)

router.get('/', (req, res, next) => {
    res.send('Welcome to the CheeseHacks 2022 API')
})

module.exports = router