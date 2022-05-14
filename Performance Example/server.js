const express = require('express')
const app = express()

function delay(mSeconds){
    const startTime = Date.now()
    while(Date.now()-startTime<mSeconds){
        //idle
    }
}


app.get('/', (req, res) => {
    res.send('Main Page')
})

app.get('/timer', (req, res) => {
    delay(5000)
    res.send('Timer Page')
})


app.listen(3000, () => {
    console.log('listening port 3000')
})