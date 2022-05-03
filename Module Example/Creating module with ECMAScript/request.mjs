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

// - if we are using ecmascript modules
export {
    REQUEST_TIMEOUT,
    send
}

/* - if we are using commonjs modules
module.exports = {
    REQUEST_TIMEOUT,
    send
}*/