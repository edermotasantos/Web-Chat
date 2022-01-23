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

const updateNickname = (socket, io) => {
  socket.on('updateNickname', (newNickName) => {
    const findUser = usersStorage.findIndex((user) => user.id === socket.id);
    usersStorage[findUser].nickname = newNickName;
    io.emit('userConnected ', usersStorage);
  });
};

const disconnectUser = (socket) => {
  socket.on('disconnect', () => {
    const disconnectedUser = usersStorage.find((user) => user.id === socket.id);
    usersStorage.splice(usersStorage.indexOf(disconnectedUser), 1);
    socket.broadcast.emit('userConnected ', usersStorage);
  });
};

module.exports = {
  connectUser,
  updateNickname,
  disconnectUser,  
};
