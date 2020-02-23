'use strict ';

const net = require('net');
const PORT = 3001;
const server = net.createServer();

let socketPool = {};
server.on('connection', (socket) => {
    const id = `Socket-${Math.random()}`
    socketPool[id] = socket;
    socket.on('data', (buffer) => {
        dispatchEvent(buffer);
    })
    socket.on('end',() => {
        delete socketPool[id];
    })
    socket.on('error', (e) => {
        console.log('Socket err', e);        
    })
})

function dispatchEvent(buffer){
    let message = JSON.parse(buffer.toString().trim());
    console.log('meesage', message);    
    broadcast(message);
}

function broadcast(message){
    let payload = JSON.stringify(message);
    console.log('payload', payload);    
    for(let socket in socketPool){
        console.log(' socketPool[socket].write(payload)',  socketPool[socket].write(payload));
        socketPool[socket].write(payload);
    }
}
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    
})
