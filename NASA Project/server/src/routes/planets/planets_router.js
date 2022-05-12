const express = require('express')
const { httpGetAllPlanets } = require('./planet_controller')
const planetsRouter = express.Router()

planetsRouter.get('/planets', httpGetAllPlanets)

module.exports=planetsRouter