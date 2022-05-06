const http = require('http')
const PORT=3000


const server = http.createServer()

server.on('request',(req,res)=>{
    if(req.url==='/friends'){
        // res.writeHead(200,{
        //     'Content-type': 'application/json',
        // })
        res.statusCode(200)
        res.setHeader('Content-type','application/json')

        res.end(JSON.stringify({
            id:1,
            name:'Albert Einstein'
        }))
    }else if(req.url==='/messages'){
        res.writeHead(200,{
            'Content-type': 'text/html'
        })
        res.write('<html>')
        res.write('<body>')
        res.write('<ul>')
        res.write('<li>Hello, Einstein</li>')
        res.write('<li>What are your thoughts on physics</li>')
        res.write('</li>')
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
        res.end()
    }else{
        res.statusCode=404
        res.write('404 Not Found')
        res.end()
    }
})

server.listen(PORT,()=>{
    console.log(`listening port ${PORT}`)
})