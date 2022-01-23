const message = require('./message');
const user = require('./user');

const { messageBody } = message;
const { connectUser, updateNickname, disconnectUser } = user;

module.exports = (io) => {
  io.on('connection', (socket) => {
    connectUser(socket, io);
    messageBody(socket, io);
    updateNickname(socket, io);
    disconnectUser(socket);
  });
};