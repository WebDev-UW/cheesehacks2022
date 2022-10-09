const express = require('express')
const userRouter = require('./user/router')
const selfRouter = require('./self/router')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('User Utility API router')
})

router.use('/user', userRouter)
router.use('/self', selfRouter)

module.exports = router