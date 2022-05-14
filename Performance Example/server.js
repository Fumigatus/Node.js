const express = require('express')
const cluster = require('cluster')
const os = require('os')

const app = express()

function delay(mSeconds){
    const startTime = Date.now()
    while(Date.now()-startTime<mSeconds){
        //idle
    }
}


app.get('/', (req, res) => {
    res.send(`Main Page pid:${process.pid}`)
})

app.get('/timer', (req, res) => {
    delay(5000)
    res.send(`Timer Page pid:${process.pid}`)
})

if(cluster.isMaster){
    console.log('Master process has been started.')
    const NUM_WORKER = os.cpus().length
    for(let i=0;i<NUM_WORKER;i++){
        cluster.fork()
    }
} else{
    console.log('Worker process has been started')
    app.listen(3000, () => {
        console.log(`pid: ${process.pid} listening port 3000`)
    })
}
