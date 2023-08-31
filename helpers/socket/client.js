const io = require('socket.io-client');

function setupSocket(compID) {
  const socket = io.connect(`http://localhost:5000`, {
    query: { compID },
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });

 

  // Return the socket instance
  return socket;
}

module.exports=setupSocket;