const express = require ('express')
const router = express.Router()
const middlewareController = require('../controllers/middlewareController')
const userController = require('../controllers/user.controller')


router.get('/getAll', userController.getAll)
router.delete('/:userId', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser)
router.post('/updateInfo/:userId', userController.updateInfo)
router.get('/getUser/:userId', userController.getUser)
router.get('/search', userController.search)
module.exports = router