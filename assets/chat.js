var socket = io();  //use our helpful socket.io library to create an event emitter

// emit a new chatMessage event from the client......

function submitfunction() {
  var from = $('#user').val();
  var message = $('#m').val();
  if (message != '') {
    socket.emit('chatMessage', from, message);
  }
  else
    alert("Please enter message.");
  // what language and selector is used below?
  // set the value to an empty string and
  // focus on the message box again
  $('#m').val('').focus();
  return false;
}

function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}


// react to a notifyUser event...........................
// on notifyUser, do this
socket.on('notifyUser', function (user) {
  var me = $('#user').val();
  if (user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  // 10 seconds after typing stops, set the notify text to an empty string
  setTimeout(function () { $('#notifyUser').text(''); }, 10000);
});

// when does the document.ready() function get executed?...................
$(document).ready(function () {
  //var name = makeid();
  var name = prompt("Enter Name", "Ravva Vamsi");
  $('#user').val(name);
  // emit a chatMessage event from the System along with a message 
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});


// react to a chatMessage event.................
// Think: on getting a chatMessage event, do this (add an <li> to our msg list)

socket.on('chatMessage', function (from, msg) {
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

function makeid() {
  var text = "";
  var possible = "abcdeghijklmnoprstuwxy";
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
