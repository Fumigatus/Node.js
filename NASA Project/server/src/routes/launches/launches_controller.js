const { 
    getAllLaunches,
    addNewLaunch,
    existsLaunch,
    abortLaunch,
} = require('../../models/launches_model')

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

function httpAbortLaunch(request, response){
    const launchId= Number(request.params.id)

    if(!existsLaunch(launchId)){
        return response.status(404).json({
            error: "The flight doesn't exist."
        })
    }

    const abortedLaunch = abortLaunch(launchId)
    return response.status(200).json(abortedLaunch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}