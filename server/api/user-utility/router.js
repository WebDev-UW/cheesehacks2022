const express = require('express')
const userRouter = require('./user/router')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('User Utility API router')
})

router.use('/user', userRouter)

module.exports = router