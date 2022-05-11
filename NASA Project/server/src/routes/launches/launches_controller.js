const { launches } = require('../../models/launches_model')

function getAllLaunches(request, response) {
    return response.status(200).json(Array.from(launches.values()))
}

module.exports = {
    getAllLaunches,
}