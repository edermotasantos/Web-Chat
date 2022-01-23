const connection = require('./connection');

const storeMessage = async ({ nickname, message, timestamp }) => {
  const db = await connection();
  await db.collection('messages')
  .insertOne({ message, nickname, timestamp });
};

const getAllMessages = async () => {
  const db = await connection();
  const storedMessages = await db.collection('messages').find().toArray();
  return storedMessages;
};

module.exports = {
  storeMessage,
  getAllMessages,
};
