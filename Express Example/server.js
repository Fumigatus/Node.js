const express = require('express')

const app = express()
const PORT = 3000
const friends = [
    {
        id: 0,
        name: 'Albert Einstein'
    },
    {
        id: 1,
        name: 'Sir Isaac Newton'
    },
    {
        id: 2,
        name: 'Aristoteles'
    }
]

app.use((req, res, next) => {
    const start = Date.now()
    next()
    const delta = Date.now() - start
    console.log(`${req.method} ${req.url} ${delta}ms`)
})

app.use(express.json())

app.post('/friends', (req, res) => {
    if(!req.body.name){
        return res.status(200).json({
            error: 'Invalid Name'
        })
    }
    const newFriend = {
        name: req.body.name,
        id: friends.length
    }
    friends.push(newFriend)
    res.json(newFriend)
})

app.get('/', (req, res) => {
    res.send('Main Page')
})

app.get('/friends', (req, res) => {
    res.json(friends)
})

// GET /friends/index
app.get('/friends/:friendIndex', (req, res) => {
    const friendIndex = +req.params.friendIndex
    const friend = friends[friendIndex]
    if (friend) {
        res.status(200).json(friend)
    } else {
        res.status(404).send('Page Not Found')
    }
})

app.get('/messages', (req, res) => {
    res.send('<ul><li>Messages Page</li></ul>')
})

app.post('/messages', (req, res) => {
    console.log('Updating Messages')
})

app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})