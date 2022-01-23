const socket = window.io();

/**
 * Consultei o repositório do Ghislaine Latorraca para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-011-project-webchat/pull/7/files
 */

 const msgForm = document.querySelector('#msg-form');
 const msgInput = document.querySelector('#msg-input');
 const nickForm = document.querySelector('#nick-form');
 const nickInput = document.querySelector('#nickname');
 
 const DATA_TESTID = 'data-testid';

 const randomNickGenerator = () => {
  let nickname = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    nickname += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  sessionStorage.setItem('nickname', nickname);
  socket.emit('userConnected ', nickname);
  return nickname;
};

socket.on('userConnected ', (usersStorage) => {
  const userOnline = document.querySelector('#user-online');
  userOnline.innerHTML = '';
  const currentNickName = sessionStorage.getItem('nickname');
  usersStorage.forEach(({ nickname }) => {
    const nickLi = document.createElement('li');
    nickLi.innerText = currentNickName;
    nickLi.setAttribute(DATA_TESTID, 'online-user');
    if (nickname !== currentNickName) {
      nickLi.innerText = nickname;
      nickLi.setAttribute(DATA_TESTID, 'online-user');
      userOnline.appendChild(nickLi);
    } else {
      userOnline.insertBefore(nickLi, userOnline.firstChild);
    }
  });
});

const createMessage = (message) => {
  const messages = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

socket.on('historyMessages', (history) => {
  history.forEach(({ timestamp, nickname, message }) => {
    const messageData = `${timestamp} - ${nickname}: ${message}`;
    createMessage(messageData);
  });
});

nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = nickInput.value;
  if (nickInput.value) {
    socket.emit('updateNickname', nickname);
    sessionStorage.setItem('nickname', nickname);
  }
  return false;
});

msgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const getNick = sessionStorage.getItem('nickname');
  const chatMessage = msgInput.value;
  if (msgInput.value) {
    socket.emit('message', { chatMessage, nickname: getNick });
    msgInput.value = '';
  }
  return false;
});

socket.on('message', (message) => createMessage(message));

window.onload = () => {
  randomNickGenerator();
};
