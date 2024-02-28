/*const socket=io('http://localhost:8000');
const form=document.getElementById('send-cointainer');
const messageInput=document.getElementById('messageInp');
const messageCointainer=document.querySelector(".cointainer");
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageCointainer.append(messageElement)
}
const Name=prompt('enter your name to join');
socket.emit('new-user-joined',Name);
socket.on('user-joined',data =>{
    append(`${Name}joined the chat`,'right');
})*/
const socket = io('http://localhost:8000');
const form = document.getElementById('send-cointainer');
const messageInput = document.getElementById('messageInp');
const messageCointainer = document.querySelector(".cointainer");
var audio=new Audio('tune.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageCointainer.append(messageElement);
    if(position="right")
    {
        audio.play();
    }

};
form.addEventListener('submit',(e)=>{
    e.preventDefault();// to prevent page from reloading
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=null;
})
const Name = prompt('Enter your name to join');
socket.emit('new-user-joined', Name);

socket.on('user-joined', data => {
    append(`${data} joined the chat`, 'right');
});
socket.on('receive', dataobj => {
    append(`${dataobj.Name}:${dataobj.message}`, 'left');
});
socket.on('left', dataobj => {
    append(`${dataobj} left the chat`,'left');
});