const path = require('path')
const express = require('express')

const app = express()
const PORT = 3000

app.get('/secret', (request, response) => {
    return response.send('Secret value')
})

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})