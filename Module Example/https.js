const { send, REQUEST_TIMEOUT} = require('./request')
const { read } = require('./response')


function makeRequest(url, data) {
    send(url, data)
    return read()
}

const responseData = makeRequest('https://www.google.com', 'hello');
console.log(responseData)

console.log(REQUEST_TIMEOUT)