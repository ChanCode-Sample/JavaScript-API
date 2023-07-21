const webSocket = new WebSocket('ws://localhost:3000');

webSocket.addEventListener('open', () => {
    console.log('接続成功');
    webSocket.send('{"message":"send data"}');
});

webSocket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    alert(data.message);
});

webSocket.addEventListener('error', (event) => {
    console.log('error');
});

webSocket.addEventListener('close', (event) => {
    console.log('close');
});
