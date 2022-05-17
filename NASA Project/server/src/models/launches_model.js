const launches = require('./launches_mongo')
const planets = require('./planet_mongo')

// const launches = new Map()

let lastFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 17, 2022'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'NOAA'],
    upcoming: true,
    succes: true,
}

// launches.set(launch.flightNumber, launch)
// launches.get(100)
saveLaunch(launch)

async function getAllLaunches() {
    return await launches.find({}, {
        '_id': 0, '__v': 0,
    });
    // return Array.from(launches.values())
}

function addNewLaunch(launch) {
    lastFlightNumber++
    launches.set(
        lastFlightNumber,
        Object.assign(launch, {
            flightNumber: lastFlightNumber,
            customers: ['NASA', 'NOAA'],
            upcoming: true,
            succes: true,
        })
    )
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        throw new Error('No habitable planet with this name')
    }


    await launches.updateOne({
        flightNumber: launch.flightNumber
    },
        launch,
        {
            upsert: true
        })
}

function existsLaunch(launchId) {
    return launches.has(launchId)
}

function abortLaunch(launchId) {
    // launches.delete(launchId) //delete to launch
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.succes = false
    return aborted
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunch,
    abortLaunch
}