function getMessages(req, res) {
    res.send('<ul><li>Messages Page</li></ul>')
}

function postMessages(req, res) {
    console.log('Updating Messages')
    res.send('Updating Messages')
}

module.exports = {
    getMessages,
    postMessages
}