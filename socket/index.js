const io = require('socket.io')(8900, {
    cors:{
        origin: 'http://localhost:3000'
    }
})

global.userOnline = new Map()


io.use(function(socket, next){
    // return the result of next() to accept the connection.
    const auth = socket.handshake.auth


    if (auth.currentUser  ) {
        const id = auth.currentUser._id
        console.log('-----CONNECT INFO------');
        userOnline.set(id, socket.id) 
        
        console.log('user online: ' ,userOnline.size);
        console.log('-----------------');
        return next();
    }
    // call next() with an Error if you need to reject the connection.
    next(new Error('Authentication error'));
});


io.on("connection", socket => { 
    const auth = socket.handshake.auth

    const dataUserOnline = [...userOnline.keys()]
    console.log('dataUserOnline: ', dataUserOnline);
    socket.broadcast.emit('online', dataUserOnline)


    // User disconnect
    socket.on('logout', () => {
        
        socket.disconnect();
    })

    socket.on('disconnecting', () => {     
        let idOffline 

        userOnline.forEach(function (item, key) { 

            if(item === socket.id){
                idOffline = key
                userOnline.delete(key)
            }
        }); 

        console.log('need to delete this: ', idOffline);
        console.log('dataUserOnline before delete:', dataUserOnline);
        const newDataUserOnline = dataUserOnline.filter(id => id !== idOffline)

        console.log('user online', userOnline.size);
        console.log('dataUserOnline after delete:', newDataUserOnline);
        socket.broadcast.emit('offline', newDataUserOnline)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
 });