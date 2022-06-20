const PATH = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const api = require('./routes/api_v1')


const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(PATH.join(__dirname, '..', 'public')))

app.use('/v1',api)

app.get('/*', (request, response) => {
    response.sendFile(PATH.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;