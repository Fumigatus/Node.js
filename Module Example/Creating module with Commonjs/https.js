// const { send } = require('./request')
const { send } = require('./request')
const { read } = require('./response')
const { REQUEST_TIMEOUT } = require('./request')



function makeRequest(url, data) {
    send(url, data)
    return read()
}

// console.log(require.cache)  // we can see ./request.js loaded one time and caching
console.log(makeRequest())
