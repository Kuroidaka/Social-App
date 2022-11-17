const express = require ('express')
const router = express.Router()
const conservationController = require('../controllers/conservation.controllers')


router.post('/send', conservationController.send)
router.post('/createChat', conservationController.createConservation)

// Get specific user's conservation by user's ID
router.get('/:conversationId', conservationController.getMessages)

// Get all user's conservations
router.get('/', conservationController.getConversation)

router.post('/test', conservationController.test)





module.exports = router