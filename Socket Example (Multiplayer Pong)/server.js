const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
})

const PORT = 3000

server.listen(PORT, () => {
    console.log(`listening port: ${PORT}`)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})