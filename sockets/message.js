const moment = require('moment');
const messageControllers = require('../controllers/message');

const messageBody = (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('MM-DD-YYYY h:mm:ss');
    await messageControllers.storeMessage({ timestamp, chatMessage, nickname });
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
};

module.exports = {
  messageBody,
};
