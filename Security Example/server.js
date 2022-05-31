const fs = require('fs')
const https = require('https')
const path = require('path')
const express = require('express')
const helmet = require('helmet')

const PORT = 3000
const app = express()
app.use(helmet())

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true //TODO: check with google account
    if (!isLoggedIn) {
        return res
            .status(401)
            .send('You have to log in for acces')
    }
    next()
}

app.get('/auth/google', (req, res) => {

})

app.get('/auth/logout', (req, res) => {

})

app.get('auth/google/callback', (req, res) => {

})

app.get('/secret', checkLoggedIn, (request, response) => {
    return response.send('Secret value')
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