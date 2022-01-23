require('dotenv').config('../.env');

const express = require('express');

const path = require('path');

const app = express();

const http = require('http').createServer(app);

app.use(express.json());

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/index')(io);

http.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
