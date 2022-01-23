const message = require('./message');
const user = require('./user');

const { messageBody } = message;
const { connectUser } = user;

module.exports = (io) => {
  io.on('connection', (socket) => {
    connectUser(socket, io);
    messageBody(socket, io);
  });
};
