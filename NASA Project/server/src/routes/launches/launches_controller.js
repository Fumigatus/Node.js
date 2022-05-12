const { getAllLaunches, addNewLaunch } = require('../../models/launches_model')

function httpGetAllLaunches(request, response) {
    return response.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(request,response){
    const launch = request.body

    launch.launchDate = new Date(launch.launchDate)
    return response.status(201).json(launch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}