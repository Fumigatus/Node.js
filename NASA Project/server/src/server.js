const http = require('http')
const { mongoConnect } = require('./services/mongo')
const app = require('./app');

const { loadPlanetsData } = require('./models/planets_model');
const { loadLaunchesData } = require('./models/launches_model');

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);

async function startServer() {
    await mongoConnect()
    await loadPlanetsData()
    await loadLaunchesData()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();