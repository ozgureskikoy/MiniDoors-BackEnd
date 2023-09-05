const io = require('socket.io-client');
const jwt = require('jsonwebtoken');



function setupSocket(compID, userID, token) {
  const socketKey = `${compID}-${userID}`

 
  const socket = io.connect(`http://localhost:5000`, {
    query: {
      compID: compID,
      userID: userID,
      token: token
    },
  });

  socket.on('connect', () => {
    console.log('Connected to server', compID, "=>", userID);
  });

  socket.disconnectSocket = () => {
    socket.disconnect();
    console.log('Disconnected from server', compID, '=>', userID);
  };

  
  return socket;
}

module.exports = setupSocket

