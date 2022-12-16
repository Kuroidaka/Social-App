const io = require('socket.io')(8900, {
    cors:{
        origin: 'http://localhost:3000'
    }
})

global.userOnline = new Map()


io.use(function(socket, next){
    // return the result of next() to accept the connection.
    
    if (socket.handshake.auth.currentUser) {
        const id = socket.handshake.auth.currentUser._id

        console.log('-----CONNECT INFO------');
        console.log('user connect:', socket.id);
        userOnline.set(id, socket.id)
        console.log('user online: ',userOnline.size);
        console.log('-----------------');
        return next();
    }
    else {
        console.log('user online', userOnline.size);
    }
    // call next() with an Error if you need to reject the connection.
    next(new Error('Authentication error'));
});


io.on("connection", socket => { 

    
    socket.on('logout', (currentUser) => {
        console.log('-----DISCONNECT INFO------');
        console.log('user disconnected on logout', socket.id);
        socket.disconnect();
        console.log('--------------------------');
    })

    socket.on('disconnecting', () => {
        console.log('-----DISCONNECT INFO------');
        console.log('user disconnecting on close tab', socket.id);
        userOnline.forEach(function (item, key) { 
            if(item === socket.id)
            userOnline.delete(key)
        }); 
        console.log('user online after delete: ', userOnline.size);
        console.log('--------------------------');
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
 });