const { 
    getAllLaunches,
    addNewLaunchDB,
    existsLaunch,
    abortLaunch,
} = require('../../models/launches_model')

async function httpGetAllLaunches(request, response) {
    return response.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunch(request, response) {
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
            error: 'Invalid launch date'
        })
    }
    //second way to check launch date
    /* if(launch.launchDate.toString()=='Invalid Date'){
        return response.status(400).json({
           error: 'Invalid launch date.'
        })
    }*/
    await addNewLaunchDB(launch)
    return response.status(201).json(launch)
}

async function httpAbortLaunch(request, response){
    const launchId= Number(request.params.id)

    const existlaunch= await existsLaunch(launchId)
    if(!existlaunch){
        return response.status(404).json({
            error: "The flight doesn't exist."
        })
    }

    const abortedLaunch = await abortLaunch(launchId)
    if (!abortedLaunch){
        return response.status(400).json({
            error: "The launch not aborted"
        })
    }

    return response.status(200).json(abortedLaunch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}