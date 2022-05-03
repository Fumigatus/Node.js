const { send, REQUEST_TIMEOUT } = require('./request')
const { read } = require('./response')


function makeRequest(url, data){
    send(url,data)
    return read()
}

console.log(makeRequest())