require('dotenv').config()
const express = require('express')
const MySQLStore = require('express-mysql-session')
const session = require('express-session')
const passport = require('passport')
const APIrouter = require('./api/api')
const { findOrCreateUser } = require('./api/user-utility/user/functions')
const router = require('./login')

const dbOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    createDatabaseTable: true
}

let sessionStore = new MySQLStore(dbOptions)

var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/login/callback'
},
function(accessToken, refreshToken, profile, cb) {
    //console.log(profile)
    findOrCreateUser(profile)
    .then(user => {
        cb(null, user[0])
    })
    .catch(err => {
        cb(err, null)
    })
}
))

const App = express()

App.use(
    session({
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: true,
        store: sessionStore
    })
)

App.use(passport.initialize())
App.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user);
  });

passport.deserializeUser(function (user, done) {
    done(null, user);
  });



App.use('/api', APIrouter)
App.use('/login', router)

App.get('/', (req, res, next) => {
    res.send('hello world')
})

App.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})