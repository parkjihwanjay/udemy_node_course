const socket = io()

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

const $locationFormButton = document.querySelector('#send-location');

socket.on('Login', msg => console.log(msg));

socket.on('locationMessage', url => console.log(url));

document.querySelector('#button').addEventListener('click', () => {
  const msg = document.getElementById('message').value;
  socket.emit('sendMessage', msg, (message) => {
    console.log('asd', message);
  });
})

$locationFormButton.addEventListener('click', () => {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported');  
  }
  $locationFormButton.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('sendLocation', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
    }, () => {
      $locationFormButton.removeAttribute('disabled');
      console.log('Location shared');
    })
    console.log(position);
  })
})