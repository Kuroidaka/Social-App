
const authemRouter = require('./authem.route')
const userRouter = require('./user.router')
const postRouter = require('./post.route')
const photoRouter = require('./photo.route')
const conservationRouter = require('./conservation.route')

function routes(app) {

    app.use('/post', postRouter)
    app.use('/authem', authemRouter)
    app.use('/user', userRouter)
    app.use('/file', photoRouter)
    app.use('/chat', conservationRouter)
}

module.exports = routes