const { parse } = require('csv-parse')
const fs = require('fs')

const habitablePlanets = []

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('../../data/kepler.csv')
    .pipe(parse({
        columns: true,
        comment: '#',
    }))
    .on('data', (data) => {
        if(isHabitablePlanet){
            habitablePlanets.push(data)
        }
    })
    .on('error',(err)=>console.log(err))

module.exports = {
    planets: habitablePlanets
}