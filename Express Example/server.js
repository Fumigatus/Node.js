const express = require('express')
const path = require('path')

const friendsRouter = require('./route/friends_route')
const messagesRouter = require('./route/messages_route')

const app = express()
const PORT = 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
    const start = Date.now()
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`)
})

app.use(express.json())

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Templatin Engine',
        caption: 'Express is a backend framework',
    })
})

app.use('/friends', friendsRouter)

app.use('/site', express.static('public'))

app.use('/messages', messagesRouter)

// app.get('/', (req, res) => { res.send('Main Page') })

app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})