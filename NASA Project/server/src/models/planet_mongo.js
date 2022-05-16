const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
    keplerName: {
        type: Number,
        required: true,
    }
})