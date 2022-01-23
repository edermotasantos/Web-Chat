const moment = require('moment');
const messageControllers = require('../controllers/message');

const messageBody = (socket, io) => {
  socket.on('message', async ({ message, nickname }) => {
    const timestamp = moment().format('MM-DD-YYYY h:mm:ss');
    await messageControllers.storeMessage({ timestamp, message, nickname });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });
};

module.exports = {
  messageBody,
};
