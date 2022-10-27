const jwt = require('jsonwebtoken')
const User = require('../models/users')

const middlewareController = {

    verifyToken: async (req, res, next) => {

        // console.log('params: ', req.params);
        const accessToken = req.cookies.accessToken
        // const token = req.headers.token
        console.log('--------------ACCESS TOKEN----------------', accessToken);
        if(accessToken){
            // const accessToken = await token.split(' ')[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, data) => {
                if(error) {
                    res.status(403).json('token is not valid')
                }
                else {
                    req.data = data
                    console.log(req.data)
                    next()
                }
            })
        }
        else {
            res.status(401).json('you\'re not authenticated')
        }
    },
    verifyTokenAndAdminAuth: async (req, res, next) => {
        middlewareController.verifyToken(req, res , () => {

            // console.log(req.data.id, '   -----    ', req.body.userId);
            if(req.data.id == req.params.postUserId || req.admin){
                next()
            }
            else 
                res.status(403).json('you\'re not allow ')
        })
    }

}

module.exports = middlewareController