
const express = require('express')
const router = express.Router()

const authemControllers = require('../controllers/authem.controller')
const middlewareController = require('../controllers/middlewareController')

// register
router.post('/register', authemControllers.register)

// login
router.post('/login', authemControllers.login)

// request refresh token
router.post('/refresh', authemControllers.requestRefreshToken)

// logout
// router.post('/logout/:userId', middlewareController.verifyToken, authemControllers.logout)

router.post('/logout/:userId', authemControllers.logout)
module.exports = router