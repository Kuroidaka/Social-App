const io = require('socket.io')(8900, {
    cors:{
        origin: 'http://localhost:3000'
    }
})

io.on("connection", socket => { 

    console.log('user connected');
    // socket.on('send_mes', mes =>{
    //     socket.emit('receive_mes', mes)
    // })

    // socket.on('join_room', (data) => {
    //     socket.join(data)
    //     console.log('user join room: ', data);
    // })

    socket.on('forceDisconnect', () => {
        console.log('User disconnect');
    })

    socket.on('disconnect', () => {
        console.log('User disconnect');
    })
 });