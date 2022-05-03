const request = require('./request.js')

request.send = () => {
    console.log('Custom send function!')
}

request.send()