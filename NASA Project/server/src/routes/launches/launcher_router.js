const express = require('express')
const { httpGetAllLaunches } = require('./launches_controller')

const launchesRouter = express.Router()

launchesRouter.get('/launches', httpGetAllLaunches)

module.exports = launchesRouter