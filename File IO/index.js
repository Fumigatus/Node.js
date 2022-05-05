const { parse } = require('csv-parse')

const result = []
const fs = require('fs')
fs.createReadStream('kepler.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        result.push(data)
    })
    .on('error', err => console.log(err))
    .on('end', () => {
        console.log(result)
    })