const http = require('http')
const PORT = 3000

const friends = [
    {
        id: 0,
        name: 'Nikola Tesla'
    },
    {
        id: 1,
        name: 'Albert Einstein'
    },
    {
        id: 2,
        name: 'Aristoteles'
    }
]
const server = http.createServer()

server.on('request', (req, res) => {
    const urlItems = req.url.split('/')
    // /friends/2 => ['','friends','2']

    if (urlItems[1] === 'friends') {
        // res.writeHead(200,{
        //     'Content-type': 'application/json',
        // })
        res.statusCode=200
        res.setHeader('Content-type', 'application/json')

        if (urlItems.length === 3) {
            const friendIndex = +urlItems[2]
            res.end(JSON.stringify(friends[friendIndex]))
        } else {
            res.end(JSON.stringify(friends))
        }
    } else if (urlItems[1] === 'messages') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.write('<html>')
        res.write('<body>')
        res.write('<ul>')
        res.write('<li>Hello, Einstein</li>')
        res.write('<li>What are your thoughts on physics?</li>')
        res.write('</li>')
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
        res.end()
    } else {
        res.statusCode = 404
        res.write('404 Not Found')
        res.end()
    }
})

server.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})