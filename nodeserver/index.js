/*const io=require('socket.io')(8000)
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',Name=>{
        console.log("new user",Name);
        users[socket.id]=Name;
        socket.broadcast.emit("user-joined",Name);
    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,Name:users[socket.id]})
    });
});*/
const io = require('socket.io')(8000, {
    cors: {
      //origin: 'http://localhost:8000',
      origin:   'http://127.0.0.1:5500',
      methods: ['GET', 'POST'],
    },
  });
  const users = {};
  io.on('connection', (socket) => {
    socket.on('new-user-joined', (Name) => {
      console.log("New user:", Name);
      users[socket.id] = Name;
      socket.broadcast.emit("user-joined", Name);
    });
    socket.on('send', (message) => {
      socket.broadcast.emit('receive', { message: message, Name: users[socket.id] });
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    });
  });