const launches = require('./launches_mongo')
const planets = require('./planet_mongo')
const axios = require('axios')

// const launches = new Map()
const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'
// let lastFlightNumber = 100

// const launch = {
//     flightNumber: 100, //flight_number
//     mission: 'Kepler Exploration X', //name
//     rocket: 'Explorer IS1', //rocket.name
//     launchDate: new Date('December 17, 2022'), //date_local
//     target: 'Kepler-442 b',
//     customers: ['NASA', 'NOAA'], //payload.customers
//     upcoming: true, //upcoming
//     succes: true, //succes
// }

// launches.set(launch.flightNumber, launch)
// launches.get(100)
// saveLaunch(launch)

async function getAllLaunches(skip, limit) {
    return await launches
        .find({}, {
            '_id': 0, '__v': 0,
        })
        .sort({ flightNumber: 1})//-1 to descending
        .skip(skip)
        .limit(limit);
    // return Array.from(launches.values())
}

async function saveLaunch(launch) {
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
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        throw new Error('No habitable planet with this name')
    }

    const newFligthNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        flightNumber: newFligthNumber,
        upcoming: true,
        succes: true,
        customers: ['NASA', 'NOAA'],
    })
    await saveLaunch(newLaunch)
}

async function findLaunch(launch) {
    return await launches.findOne(launch)
}

async function existsLaunch(launchId) {
    return await findLaunch({
        flightNumber: launchId,
    })
    //return launches.has(launchId)
}

async function populateLaunches() {
    console.log('Downloading launch data...');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });

    if (response.status !== 200) {
        console.log('Have a problem downlading data from SpaceX api');
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        };

        console.log(`${launch.flightNumber} ${launch.mission}`);

        await saveLaunch(launch);
    }
}

async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        mission: 'FalconSat',
        rocket: 'Falcon 1'
    })

    if (firstLaunch) {
        console.log('Launches up to date')
        return
    } else {
        await populateLaunches()
    }
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
    loadLaunchesData,
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