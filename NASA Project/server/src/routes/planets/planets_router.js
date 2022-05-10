const express = require('express')
const { getAllPlanets } = require('./planet_controller')
const planetsRouter = express.Router()

planetsRouter.get('/planets', getAllPlanets)

module.exports=planetsRouter