// module.exports.REQUEST_TIMEOUT=500
// exports.REQUEST_TIMEOUT = 500
const REQUEST_TIMEOUT = 500

function encrypt(data) {
    return 'encrypted data'
}

// module.exports.send = function send(){....}
// exports.send = function send() {....}
function send(url, data) {
    const encryptedData = encrypt(data)
    console.log(`sending ${encryptedData} to ${url}`)
}

module.exports = {
    send,
    REQUEST_TIMEOUT
}

// Hello from reques! printed terminal one time because of module caching
console.log('Hello from request!')