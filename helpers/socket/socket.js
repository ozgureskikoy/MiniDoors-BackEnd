const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

const port = process.env.PORT || 5000;

//const connectedSockets = {};

exports.start = () => {
  io.on('connection', (socket) => {
    const compID = parseInt(socket.handshake.query.compID, 10);
    //connectedSockets[compID] = socket;
    socket.join(compID);
    //console.log(`connected: ${userID} in ${Object.keys(connectedSockets)}`);
    console.log(`connected: ${compID}`);

    socket.on('message', (message) => {
      console.log(`received from ${compID}: ${message}`);
      const messageArray = JSON.parse(message);
      console.log(message);
      const toUserID = messageArray[0];

      io.to(toUserID).emit('message', JSON.stringify(messageArray));
    });

    //   const toUserSocket = connectedSockets[toUserID];

    //   if (toUserSocket) {
    //     console.log(`sent to ${toUserID}: ${JSON.stringify(messageArray)}`);
    //     messageArray[0] = userID;
    //     toUserSocket.emit('message', JSON.stringify(messageArray));
    //   }
    // });

    socket.on('disconnect', () => {
      //delete connectedSockets[userID];
      socket.leave(compID);
      console.log(`disconnected: ${compID}`);
    });
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
