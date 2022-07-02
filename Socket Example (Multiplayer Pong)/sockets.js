let readyPlayerCount = 0

function listen(io) {
    io.on('connection', (socket) => {
        console.log(`a user connecteed as id: ${socket.id}`)

        socket.on('ready', () => {
            readyPlayerCount++;
            console.log(`Client ${socket.id} is ready`)
            if (readyPlayerCount % 2 === 0) {
                io.emit('startGame', socket.id)
            }
        })

        socket.on('paddleMove', (paddleData) => {
            socket.broadcast.emit('paddleMove', paddleData)
        })

        socket.on('ballMove', (ballData) => {
            socket.broadcast.emit('ballMove', ballData)
        })

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} has been disconnected: ${reason}`)
        })
    })
}

module.exports = {
    listen,
}