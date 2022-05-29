const fs = require('fs')
const https = require('https')
const path = require('path')
const express = require('express')
const helmet = require('helmet')

const app = express()
app.use(helmet())

const PORT = 3000

app.get('/secret', (request, response) => {
    return response.send('Secret value')
})

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'))
})

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
},app).listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})