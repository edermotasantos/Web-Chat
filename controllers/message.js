const messageModels = require('../models/message');

const storeMessage = async ({ nickname, message, timestamp }) => {
  await messageModels.storeMessage({ nickname, message, timestamp });
};

const getAllMessages = async () => {
  const storedMessages = await messageModels.getAllMessages();
  return storedMessages;
};

module.exports = {
  storeMessage,
  getAllMessages,
}; 
