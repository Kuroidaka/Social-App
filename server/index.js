require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const connect = require('./config/database')
const upload = require('./routes/photo.route')
const routes = require('./routes/index')
const authemControllers = require('./controllers/authem.controller')

const app = express()

connect();
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(cors()) 
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

routes(app)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

global.io = require('socket.io')(server,{
    cors:{
        origin: 'http://localhost:3000'
    }
})

global.onlineUser = {}

io.use(function(socket, next){
    // return the result of next() to accept the connection.
    const auth = socket.handshake.auth


    if (auth.currentUser) {
        const id = auth.currentUser._id
        console.log('-----CONNECT INFO------');
        onlineUser[id] = socket.id
        
        console.log('online user:', Object.keys(onlineUser).length);

        return next();
    }
    // call next() with an Error if you need to reject the connection.
    next(new Error('Authentication error'));
});


io.on("connection", socket => { 
    const auth = socket.handshake.auth

    socket.on('online', currentUser => {
        authemControllers.setUserOnline(currentUser)
    })

    socket.on('send-msg', data => {

        socket.to(onlineUser[data.receive]).emit('receive-msg', data)
    })

    // User disconnect
    socket.on('logout', () => {

        socket.disconnect();
    })

    socket.on('disconnecting', () => {     

        for(const key in onlineUser){
            if(onlineUser[key] === socket.id)
            delete onlineUser[key]
        }

        const currentUser = socket.handshake.auth.currentUser

        authemControllers.logout(currentUser)
        console.log('online user:', Object.keys(onlineUser).length);

    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
 });