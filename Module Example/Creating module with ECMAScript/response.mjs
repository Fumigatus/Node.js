function decrypt(data) {
    return 'decrypted data'
}

function read() {
    return decrypt('data')
}

export {
    read
}

/* - if we are using commonjs modules
module.exports={
    read
}*/