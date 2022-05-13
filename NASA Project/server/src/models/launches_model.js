const launches = new Map()

let lastFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 17, 2022'),
    target: 'Kepler-442 b',
    customer: ['NASA', 'NOAA'],
    upcoming: true,
    succes: true,
}

launches.set(launch.flightNumber, launch)
// launches.get(100)

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    lastFlightNumber++
    launches.set(
        lastFlightNumber,
        Object.assign(launch, {
            flightNumber: lastFlightNumber,
            customer: ['NASA', 'NOAA'],
            upcoming: true,
            succes: true,
        })
    )
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