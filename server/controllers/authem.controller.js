const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let refreshTokens = []

const authemControllers = {
    
// generate access token 
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: '360d'}
        )
    },
// generate refresh token 
    generateRefreshToken: (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: '360d'}
    )
    },

// register
    register: async (req, res) => {
        try{
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            
            // create new User
            const newUser = await new User({
                info: {
                    name: req.body.name
                },
                username: req.body.username,
                password: hashed
            })

            // save db
            const user = await newUser.save()
            res.status(200).json(user)

        }catch(error){
            res.status(500).json(error)

        }
    },
// login
    login: async (req, res) => {
        try{
            // check user exist in db
            const user = await User.findOne({username: req.body.username})
            if(!user) {
                return res.status(404).json('username or password is not correct')
            }
            
            // compare password 
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword) {
                return res.status(404).json('username or password is not correct')
            }


            if(user && validPassword) {
                // create token, refresh token
                const accessToken = authemControllers.generateAccessToken(user)
                const refreshToken = authemControllers.generateRefreshToken(user)
            
                refreshTokens.push(refreshToken)

                // save refresh token to cookie

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict'
                })

                await User.updateOne({username: req.body.username}, 
                    {$set:{ 
                        accessToken: accessToken, 
                        online : true
                    }})
                
                const newUser = await User.find({username: req.body.username})
                    // console.log(newUser[0])

                return res.status(200).json(newUser[0])
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json(error)
            
        }

    },
    setUserOnline: async (currentUser) => {
        await User.updateOne({_id: currentUser._id}, {
            '$set': { 
                online: true
            }
        })
        .then(data => {
           return 
        })

    },
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken



        if(!refreshToken) res.status(401).json('Not logged yet')
        // if(!refreshTokens.includes(refreshToken))
        //    return res.status(403).json('Refresh is not valid')
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
            if(error){
                console.log(error)
            }

           refreshTokens = refreshTokens.filter(token => token !== refreshToken)

            // Create new access token, refresh token
            const newAccessToken = authemControllers.generateAccessToken(user)
            const newRefreshToken = authemControllers.generateRefreshToken(user)

            refreshTokens.push(newRefreshToken)

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })

         res.status(200).json({accessToken: newAccessToken})

        })
            
    },

    logout: async (req) => {        
        // res.clearCookie('accessToken')
        await User.updateOne({_id: req._id}, {
            '$set': { 
                online: false
            }
        })
        .then(() => {
           return 
        })

        

        //refreshTokens = refreshTokens.filter(token => token!== refreshToken)
       
    }

}

module.exports = authemControllers

// // bug 
// refreshTokens = refreshTokens.filter(token => token!== req.cookies.refreshToken)
// ^

// TypeError: Cannot read properties of undefined (reading 'refreshToken')