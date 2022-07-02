const api = require('./api')
const http = require('http')
const io = require('socket.io')
const sockets = require('./sockets')

const httpServer = http.createServer(api)
const socketServer = io(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
})


const PORT = 3000
httpServer.listen(PORT, () => {
    console.log(`listening port: ${PORT}`)
})

sockets.listen(socketServer)