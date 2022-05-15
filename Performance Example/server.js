const express = require('express')
const cluster = require('cluster')
const os = require('os')

const app = express()

function delay(mSeconds) {
    const startTime = Date.now()
    while (Date.now() - startTime < mSeconds) {
        //idle
    }
}


app.get('/', (req, res) => {
    res.send(`Main Page pid:${process.pid}`)
})

app.get('/timer', (req, res) => {
    delay(2000)
    res.send(`Changed Timer Page pid:${process.pid}`)
})

console.log('Worker process has been started')
app.listen(3000, () => {
    console.log(`pid: ${process.pid} listening port 3000`)
})
