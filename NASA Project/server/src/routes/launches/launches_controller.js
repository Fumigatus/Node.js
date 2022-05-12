const { getAllLaunches } = require('../../models/launches_model')

function httpGetAllLaunches(request, response) {
    return response.status(200).json(getAllLaunches)
}

module.exports = {
    httpGetAllLaunches,
}