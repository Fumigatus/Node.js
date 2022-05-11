const launches = new Map()

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchData: new Date('December 17 2022'),
    target: 'Kepler-442 b',
    customer: ['NASA', 'NOAA'],
    upcoming: true,
    succes: true,
}

launches.set(launch.flightNumber, launch)
// launches.get(100)

module.exports = {
    launches,
}