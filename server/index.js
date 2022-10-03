require('dotenv').config()
const express = require('express')

const App = express()

App.get('/', (req, res, next) => {
    res.send('hello world')
})

App.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})