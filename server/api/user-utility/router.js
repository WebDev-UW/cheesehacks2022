const express = require('express')
const userRouter = require('./user/router')
const selfRouter = require('./self/router')
const statsRouter = require('./stats/router')
const tableRouter = require('./table/router')

const router = express.Router()

// router.get('/', (req, res, next) => {
//     res.send('User Utility API router')
// })

router.use('/user', userRouter)
router.use('/self', selfRouter)
router.use('/stats', statsRouter)
router.use('/table', tableRouter)

module.exports = router