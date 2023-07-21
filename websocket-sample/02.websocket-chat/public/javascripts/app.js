const webSocket = new WebSocket('ws://localhost:3000');

webSocket.addEventListener('message', (event) => {
    const chatArea = document.getElementById('chat-area');
    const data = JSON.parse(event.data);
    chatArea.innerHTML += `<h3>${data.user}:${data.message}</h3>`;
});

const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', () => {
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;
    webSocket.send(JSON.stringify({ user, message }));
});
