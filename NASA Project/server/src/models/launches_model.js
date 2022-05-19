const launches = require('./launches_mongo')
const planets = require('./planet_mongo')


// const launches = new Map()
const DEFAULT_FLIGHT_NUMBER = 100;
// let lastFlightNumber = 100

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

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne()
        .sort('-flightNumber')

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber
}

async function addNewLaunchDB(launch) {
    const newFligthNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        flightNumber: newFligthNumber,
        upcoming: true,
        succes: true,
        customers: ['NASA', 'NOAA'],
    })
    saveLaunch(newLaunch)
}



async function existsLaunch(launchId) {
    return await launches.findOne({
        flightNumber: launchId,
    })
    //return launches.has(launchId)
}

async function abortLaunch(launchId) {
    const aborted = await launches.updateOne({
        flightNumber: launchId
    }, {
        succes: false,
        upcoming: false
    })
    return aborted.modifiedCount == 1
    // launches.delete(launchId) //delete to launch
    // const aborted = launches.get(launchId)
    // aborted.upcoming = false
    // aborted.succes = false
    // return aborted
}

module.exports = {
    getAllLaunches,
    addNewLaunchDB,
    existsLaunch,
    abortLaunch
}
//in memory addNewLaunch
// function addNewLaunch(launch) {
//     lastFlightNumber++
//     launches.set(
//         lastFlightNumber,
//         Object.assign(launch, {
//             flightNumber: lastFlightNumber,
//             customers: ['NASA', 'NOAA'],
//             upcoming: true,
//             succes: true,
//         })
//     )
// }