const http = require('http')
const PORT=3000


const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-Type':'application/json'
    })
    res.end(JSON.stringify({
        id:1,
        name:'Albert Einstein'
    }))
})

server.listen(PORT,()=>{
    console.log(`listening port ${PORT}`)
})