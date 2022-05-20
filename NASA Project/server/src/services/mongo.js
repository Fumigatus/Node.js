const mongoose = require('mongoose')
const pass= require('./mongodbpass')

const MONGO_URL = `mongodb+srv://nasa-api:${pass}@nasacluster.51iog.mongodb.net/nasa?retryWrites=true&w=majority`

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection is ready!')
})

mongoose.connection.on('error',(err)=>{
    console.log(`Error info: ${err}`)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDisconnect
}