const path = require('path') // unix=>/folder/filename windows=> \folder\filename

function getMessages(req, res) {
    res.sendFile(path.join(__dirname,'..','public','mountain.jpg'))
    // res.send('<ul><li>Messages Page</li></ul>')
}

function postMessages(req, res) {
    console.log('Updating Messages')
    res.send('Updating Messages')
}

module.exports = {
    getMessages,
    postMessages
}