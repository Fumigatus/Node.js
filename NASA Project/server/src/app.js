const express = require('express')
const cors = require('cors')

const planetsRouter = require('./routes/planets/planets_router')

const app = express()

app.use(cors())
app.use(planetsRouter)

module.exports=app;