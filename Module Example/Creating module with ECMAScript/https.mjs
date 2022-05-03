/* - if we are using commonjs modules
const { send, REQUEST_TIMEOUT} = require('./request')*/
// const { read } = require('./response')

// - if we are using ecmascript modules we must to change extentions on file (mjs)
import { send, REQUEST_TIMEOUT } from './request.mjs'
import { read } from './response.mjs'


function makeRequest(url, data) {
    send(url, data)
    return read()
}

const responseData = makeRequest('https://www.google.com', 'hello');
console.log(responseData)

console.log(REQUEST_TIMEOUT)