let readyPlayerCount = 0

function listen(io) {
    const pongNamespace=io.of('/pong')
    let room
    io.on('connection', (socket) => {
        console.log(`a user connecteed as id: ${socket.id}`)

        socket.on('ready', () => {
            room ='room'+Math.floor(readyPlayerCount/2)
            socket.join(room)
            readyPlayerCount++;
            console.log(`Client ${socket.id} is ready room id:${room}`)
            if (readyPlayerCount % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id)
            }
        })

        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData)
        })

        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData)
        })

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} has been disconnected: ${reason}`)
            socket.leave(room)
        })
    })
}

module.exports = {
    listen,
}