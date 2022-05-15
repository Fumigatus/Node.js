const {
    workerData,
    Worker,
    isMainThread
} = require('worker_threads')

if (isMainThread) {
    console.log(`Main thread! Pid: ${process.pid}`)
    new Worker(__filename,{
        workerData: [4, 7, 2, 8, 0]
    })
    new Worker(__filename,{
        workerData: [2, 4, 6, 2, 1]
    })
} else {
    console.log(`Worker! Pid: ${process.pid}`)
    console.log(`Workerdata: ${workerData}, sorted worker data: ${workerData.sort()}`)
}

