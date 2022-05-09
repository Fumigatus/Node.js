const express = require('express')

const friendsRouter = require('./route/friends_route')
const messagesRouter = require('./route/messages_route')


const app = express()
const PORT = 3000


app.use((req, res, next) => {
    const start = Date.now()
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`)
})

app.use(express.json())

app.use('/friends',friendsRouter)

app.use('/messages',messagesRouter)

app.get('/', (req, res) => { res.send('Main Page') })

app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})