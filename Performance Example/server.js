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

// if(cluster.isMaster){
//     console.log('Master process has been started.')
//     const NUM_WORKER = os.cpus().length
//     for(let i=0;i<NUM_WORKER;i++){
//         cluster.fork()
//     }
// } else{
//     console.log('Worker process has been started')
//     app.listen(3000, () => {
//         console.log(`pid: ${process.pid} listening port 3000`)
//     })
// }

/*
pm2 start <filename> -i max => for max cluster usage
pm2 list/ls/status => list to processes
pm2 start name/id => start to specific process
pm2 restart server.js => restart to server
pm2 logs => show logs
pm2 logs --200 => show last 200 logs
pm2 delete server.js => sgutdown server
pm2 start server.js -l logs.txt => logs written in logs.txt
pm2 show id => process are looked at in more detail
pm2 monit => live dashboard
*/
console.log('Worker process has been started')
app.listen(3000, () => {
    console.log(`pid: ${process.pid} listening port 3000`)
})

