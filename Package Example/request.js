const axios = require('axios')

axios.get('https://www.wikipedia.com')
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(`${err}`)
    })
    .then(()=>{
        console.log('All done!')
    })
