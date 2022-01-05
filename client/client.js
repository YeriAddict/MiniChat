// Loading socket variable
var socket = io();

// Handling login input value
$('#login form').submit(function (e) {
 e.preventDefault();

 var user = {
   username : $('#login input').val().trim()
 };

 if (user.username.length > 0 && user.username.length < 30) { 
   socket.emit('user-login', user);
   $('#login').remove(); 
 }
 else {
   alert("Enter a name between 0 and 30 characters")
 }
});

// Handling chat input value
$('#chat-form').submit(function (e) {
 e.preventDefault();

 var message = {
   text : $('#chat-input').val()
 };

 $('#chat-input').val('');
 if (message.text.trim().length !== 0) { 
   socket.emit('chat-message', message);
 }
});

// Adding messages to the chatbox
socket.on('chat-message', function (message) {
 $('#chat-messages').append($('<li>').html('<span class="username">' + message.username + " : " + '</span>' + message.text));
});

// Adding broadcast messages to the chatbox
socket.on('service-message', function (message) {
 $('#chat-messages').append($('<li>').html('<span class="broadcast">[MINICHAT]</span> ' + message.text));
});