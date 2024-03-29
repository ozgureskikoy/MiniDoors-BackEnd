const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
global.config = require('../tokenConfig');


const port = process.env.PORT || 5000;
const loggedInUsers = [];

const socketMap = new Map();

exports.start = () => {


  io.on('connection', (socket) => {
    const compID = parseInt(socket.handshake.query.compID, 10);
    const userID = socket.handshake.query.userID;
    const token = socket.handshake.query.token

    jwt.verify(token, global.config.secretKey, (err, decoded) => {
      if (err) {
        console.log("control==> " + err);

        socket.disconnect();

      } else {
        console.log("token correct");
        console.log("socket id => ", socket.id);
        socketMap.set(userID, socket.id, socket)
        console.log("MAP =>> ", socketMap);
        loggedInUsers.push(userID)
        if (loggedInUsers.includes(userID)) {
          socket.join(compID);
          console.log(`User ${userID} connected in company  ${compID}`)
        }


        socket.on('message', (message) => {
          // console.log(`received from ${compID}: ${message}`);
          const messageArray = JSON.parse(message);
          console.log("in socket", message);
          const toUserID = messageArray[0];

          io.to(toUserID).emit('message', JSON.stringify(messageArray));
        });

      }
    });
    let socketIdToFind
    exports.delSocket = (val) => {
      if (val) {
        socketIdToFind = val
      }
      socket.on('disconnect', () => {

        const userIdForSocket = socketMap.get(socketIdToFind);

        if (userIdForSocket !== undefined) {
          socketMap.delete(socketIdToFind);
          console.log(`Socket ID ${socketIdToFind} disconnected for userID: ${userIdForSocket}`);
          console.log("MAP2 =>> ", socketMap);


        } else {
          console.log(`UserID ${socketIdToFind} not found.`);
        }

      });
    }
    socket.on('disconnect', () => {

      socketIdToFind = userID;
      const userIdForSocket = socketMap.get(socketIdToFind);

      if (userIdForSocket !== undefined) {
        socketMap.delete(socketIdToFind);
        console.log(`Socket ID ${socketIdToFind} disconnected for userID: ${userIdForSocket}`);
        console.log("MAP2 =>> ", socketMap);


      } else {
        console.log(`UserID ${userIdToFind} not found.`);
      }

    });
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
