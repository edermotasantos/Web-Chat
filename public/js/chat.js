const socket = window.io();

/**
 * Consultei o repositório do Ghislaine Latorraca para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-011-project-webchat/pull/7/files
 */

const createMessage = (message) => {
  const messages = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

socket.on('message', (message) => createMessage(message));
