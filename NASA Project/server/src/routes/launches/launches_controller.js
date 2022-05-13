const { getAllLaunches, addNewLaunch } = require('../../models/launches_model')

function httpGetAllLaunches(request, response) {
    return response.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(request, response) {
    const launch = request.body
    if (!launch.launchDate || !launch.mission || !launch.target || !launch.rocket) {
        return response.status(400).json({
            error: 'Missing operator'
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    //checking launch date is valid or not
    if (isNaN(launch.launchDate)) {
        return response.status(400).json({
            error: 'Invalid launch date.'
        })
    }
    //second way to check launch date
    /* if(launch.launchDate.toString()=='Invalid Date'){
        return response.status(400).json({
           error: 'Invalid launch date.'
        })
    }*/
    addNewLaunch(launch)
    return response.status(201).json(launch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}