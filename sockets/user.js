const messageControllers = require('../controllers/message');

const usersStorage = [];

/**
 * Consultei o repositório do Ghislaine Latorraca para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-011-project-webchat/pull/7/files
 */

const connectUser = (socket, io) => {
  socket.on('userConnected ', async (nickname) => {
    usersStorage.push({ nickname, id: socket.id });
    io.emit('userConnected ', usersStorage);
    const messageHistory = await messageControllers.getAllMessages();
    socket.emit('historyMessages', messageHistory);
  });
};

module.exports = {
  connectUser,
};
