//Create web server
var express = require('express');
var app = express();

//Create server
var server = require('http').createServer(app);

//Create server socket
var io = require('socket.io')(server);

//Create a list of comments
var comments = [];

//Create a list of users
var users = [];

//When a user connects
io.on('connection', function(socket){
  console.log('A user connected');

  //When a user disconnects
  socket.on('disconnect', function(){
    console.log('A user disconnected');
  });

  //When a user adds a comment
  socket.on('addComment', function(data){
    comments.push(data);
    io.emit('commentList', comments);
  });

  //When a user logs in
  socket.on('login', function(data){
    users.push(data);
    io.emit('userList', users);
  });

  //When a user logs out
  socket.on('logout', function(data){
    var index = users.indexOf(data);
    users.splice(index, 1);
    io.emit('userList', users);
  });

  //When a user edits a comment
  socket.on('editComment', function(data){
    var index = comments.indexOf(data);
    comments[index] = data;
    io.emit('commentList', comments);
  });

  //When a user deletes a comment
  socket.on('deleteComment', function(data){
    var index = comments.indexOf(data);
    comments.splice(index, 1);
    io.emit('commentList', comments);
  });

  //When a user deletes a comment
  socket.on('deleteComment', function(data){
    var index = comments.indexOf(data);
    comments.splice(index, 1);
    io.emit('commentList', comments);
  });

  //When a user upvotes a comment
  socket.on('upvote', function(data){
    var index = comments.indexOf(data);
    comments[index].upvotes++;
    io.emit('commentList', comments);
  });

  //When a user downvotes a comment
  socket.on('downvote', function(data){
    var index = comments.indexOf(data);
    comments[index].downvotes++;
    io.emit('commentList', comments);
  });

  //When a user reports a comment
  socket.on('report', function(data){
    var index = comments.indexOf(data);
    comments[index].reports++;
    io.emit('commentList', comments);
  });

  //When a user marks a comment as spam
  socket.on('markSpam', function(data){
    var index = comments.indexOf(data);
    comments[index].spam = true;
    io.emit('commentList', comments);
  });

  //When a user marks a comment as not spam
  socket.on('markNotSpam', function(data){
    var index = comments.indexOf(data);
    comments[index].spam = false;
    io.emit('commentList', comments);
  });

  //When a user marks a comment as spam
  socket.on('markSpam', function(data){
    var index = comments.indexOf(data);
    comments[index].spam = true;
    io.emit('commentList', comments);
  });

  //When a user flags a comment
  socket.on('flag', function(data){
    var index = comments.indexOf(data);
    comments[index].flags++;
    io.emit('commentList', comments);
  });
});

//Listen on port 3000
server.listen(3000, function(){
  console.log('Server listening on port 3000');
});