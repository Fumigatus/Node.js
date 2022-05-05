const { parse } = require('csv-parse')

const result = []
const fs = require('fs')

function isHabitable(planet){
    return planet['koi_disposition']==='CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitable(data)){
            result.push(data)
        }
    })
    .on('error', err => console.log(err))
    .on('end', () => {
        console.log('Habitable planets;')
        // console.log(result.map(planet=>{
        //     return planet['kepler_name']
        // }))
        for(x of result){
            console.log(x['kepid'],'|',x['kepler_name'])
        }
    })
