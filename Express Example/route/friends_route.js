const express = require('express')

const friendsController = require('../controllers/friends_controllers')

const friendsRouter = express.Router()

friendsRouter.use((req,res,next)=>{
    console.log(`ip=> ${req.ip}`)
    next()
})

friendsRouter.post('/', friendsController.postNewFriend)

friendsRouter.get('/', friendsController.getFriends)

// GET /friends/index
friendsRouter.get('/:friendIndex', friendsController.getFriendByIndex)



module.exports = friendsRouter