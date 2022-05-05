const { parse } = require('csv-parse')

const result = []
const fs = require('fs')
fs.createReadStream('kepler.csv')
    .on('data',(data)=>{
        result.push(data)
    })
    .on('error',err=>console.log(err))
    .on('end',()=>{
        console.log(result)
    })