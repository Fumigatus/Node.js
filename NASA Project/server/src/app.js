const PATH = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const planetsRouter = require('./routes/planets/planets_router')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(PATH.join(__dirname, '..', 'public')))


app.use(planetsRouter)
app.get('/', (request, response) => {
    response.sendFile(PATH.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;