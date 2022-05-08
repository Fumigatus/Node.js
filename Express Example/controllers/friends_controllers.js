const model = require('../models/friend_model')

function getFriends(req, res) {
    res.json(model)
}

function getFriendByIndex(req, res) {
    const friendIndex = +req.params.friendIndex
    const friend = model[friendIndex]
    if (friend) {
        res.status(200).json(friend)
    } else {
        res.status(404).send('Page Not Found')
    }
}

function postNewFriend(req, res) {
    if (!req.body.name) {
        return res.status(200).json({
            error: 'Invalid Name'
        })
    }
    const newFriend = {
        name: req.body.name,
        id: model.length
    }
    model.push(newFriend)
    res.json(newFriend)
}

module.exports={
    getFriendByIndex,
    getFriends,
    postNewFriend
}