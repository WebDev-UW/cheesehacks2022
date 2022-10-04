require('dotenv').config()
const express = require('express')
const APIrouter = require('./api/api')

const App = express()

App.use('/api', APIrouter)

App.get('/', (req, res, next) => {
    res.send('hello world')
})

App.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})