const socket = io();

document.getElementById('joinButton').addEventListener('click', async () => {
    document.getElementById('joinButton').style.display = 'none';
    document.getElementById('leaveButton').style.display = 'inline-block';

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('localVideo').srcObject = stream;

    // Poslanie správy serveru, že používateľ sa pripojil
    socket.emit('message', { action: 'join', stream: stream });
});

document.getElementById('leaveButton').addEventListener('click', () => {
    document.getElementById('joinButton').style.display = 'inline-block';
    document.getElementById('leaveButton').style.display = 'none';
    socket.emit('message', { action: 'leave' });
});

socket.on('message', (data) => {
    // Spracovanie prijatých údajov, ako je vzdialený video stream
    console.log("Message received from server:", data);
});
