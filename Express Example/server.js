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

app.get('/', (req, res) => {
    res.send('Main Page')
})

app.get('/friends', (req, res) => {
    res.json(friends)
})

// GET /friends/index
app.get('/friends/:friendIndex', (req, res) => {
    const friendIndex= +req.params.friendIndex
    const friend=friends[friendIndex]
    if(friend){
        res.status(200).json(friend)
    }else{
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