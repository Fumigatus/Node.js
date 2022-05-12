const express = require('express')
const { httpGetAllLaunches, httpAddNewLaunch } = require('./launches_controller')

const launchesRouter = express.Router()

launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/',httpAddNewLaunch)

module.exports = launchesRouter