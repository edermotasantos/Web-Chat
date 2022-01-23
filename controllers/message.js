const messageModels = require('../models/message');

const storeMessage = async ({ nickname, chatMessage, timestamp }) => {
  await messageModels.storeMessage({ nickname, chatMessage, timestamp });
};

const getAllMessages = async () => {
  const storedMessages = await messageModels.getAllMessages();
  return storedMessages;
};

module.exports = {
  storeMessage,
  getAllMessages,
};
