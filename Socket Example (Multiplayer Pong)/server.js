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

let readyPlayerCount = 0

server.listen(PORT, () => {
    console.log(`listening port: ${PORT}`)
})

io.on('connection', (socket) => {
    console.log(`a user connecteed as id: ${socket.id}`)

    socket.on('ready', () => {
        readyPlayerCount++;
        if(readyPlayerCount===2){
            io.emit(`startGame ${socket.id}`)
        }
    })
})