const http = require('http')
const pass = require('./mongodbpass')
const mongoose = require('mongoose')
const app = require('./app');

const { loadPlanetsData } = require('./models/planets_model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://nasa-api:${pass}@nasacluster.51iog.mongodb.net/nasa?retryWrites=true&w=majority`

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(`Error info: ${err}`);
})

async function startServer() {
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();