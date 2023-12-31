const express=require('express');
const app=express();
const http=require('http');
const server = http.createServer(app);
const path=require('path');
const {Server}=require('socket.io');
const io=new Server(server);

io.on('connection',(socket)=>{
    console.log(`a user connected`);
    socket.on('chat Message',(msg)=>{
        io.emit('chat message',msg);
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})

app.get('/', (req, res) => {
    const pathFile=path.join(__dirname,'public','index.html');
    res.sendFile(pathFile);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});