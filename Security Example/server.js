const fs = require('fs')
const https = require('https')
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
require('dotenv').config()


const PORT = 3000

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google Profile:', profile)
    done(null, profile)
}

const app = express()

app.use(helmet())
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true //TODO: check with google account
    if (!isLoggedIn) {
        return res
            .status(401)
            .send('You have to log in for access')
    }
    next()
}

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email'],
    })
)

app.get('/auth/logout', (req, res) => {

})

app.get('auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: false,
}),(req, res) => {
    console.log('Google callback')
})

app.get('/secret', checkLoggedIn, (request, response) => {
    return response.send('Secret value')
})

app.get('/failure', (req, res) => {
    return res.send('Something wrong to log in.')
})

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'))
})

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})