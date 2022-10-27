const express = require ('express')
const router = express.Router()
const conservationController = require('../controllers/conservation.controllers')


router.post('/:userId', conservationController.createChat)
// router.get('/get', conservationController.createChat)


module.exports = router