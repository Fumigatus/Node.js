/* -first way-
const http = require('http')
const http = require('https')

const req = http.request('http://www.google.com', ...)
const request = http.request('https://www.google.com', response => {
    response.on('data', chunk => console.log(`The data chunk is ${chunk}`))
    response.on('end',()=>console.log("End of data"))
})

request.end();
*/


/* -second way-
const {request} = require('https')

const req = request('https://www.google.com', response => {
    response.on('data', chunk => console.log(`The data chunk is ${chunk}`))
    response.on('end',()=>console.log("End of data"))
})

req.end();*/


// -third way-
const { get } = require("http");
get('http://www.google.com', res=>{
    res.on('data',(chunk)=>console.log(`The data chunk is ${chunk}`))
    res.on('end',()=>console.log(`End of the data`))
})
