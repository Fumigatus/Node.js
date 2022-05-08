const express = require('express')
const friendsController = require('./controllers/friends_controllers')
const messagesController = require('./controllers/messages_controller')


const app = express()
const PORT = 3000


app.use((req, res, next) => {
    const start = Date.now()
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${req.url} ${delta}ms`)
})

app.use(express.json())

app.post('/friends', friendsController.postNewFriend)

app.get('/', (req, res) => { res.send('Main Page') })

app.get('/friends', friendsController.getFriends)

// GET /friends/index
app.get('/friends/:friendIndex', friendsController.getFriendByIndex)

app.get('/messages', messagesController.getMessages)

app.post('/messages', messagesController.postMessages)

app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})