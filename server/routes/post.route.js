
const express = require('express')
const middlewareController = require('../controllers/middlewareController')
const router = express.Router()

const postControllers = require('../controllers/post.controllers')


// register
router.post('/createPost', postControllers.createPost)
router.delete('/deletePost/:userId/:postId/:postUserId', middlewareController.verifyTokenAndAdminAuth, postControllers.deletePost)
router.get('/getAll', postControllers.getAllPost)
router.get('/get/:userId', postControllers.getById)
router.post('/like/:postId', postControllers.like)
router.post('/changePost', postControllers.changeAvatarPost)



module.exports = router