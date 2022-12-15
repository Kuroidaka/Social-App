const express = require ('express')
const router = express.Router()
const conservationController = require('../controllers/conservation.controllers')


router.post('/send', conservationController.send)
// Get specific user's conservation by user's ID
router.get('/get', conservationController.getMessages)
// Get all user's conservations
router.get('/', conservationController.findConversation)






module.exports = router