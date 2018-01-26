// making connection to socket server
const socket = io.connect('http://localhost:3000');

//DOM elements
const message = document.getElementById('message');
const sender = document.getElementById('sender');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// event click send message emit event to server
btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    sender: sender.value
  });
});

// recept of a chat event from server
socket.on('chat', data => {
  output.innerHTML += `<p><strong>${data.sender}</strong> ${data.message}</p>`;
  feedback.innerHTML = '';
});

// event typing in the message input
message.addEventListener('keypress', () => {
  socket.emit('typing', sender.value);
});

//event recept of typing event from server
socket.on('typing', data => {
  feedback.innerHTML = `<p><em>${data} is typing a message....</em></p>`;
});
