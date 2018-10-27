module.exports = http => {
	var io = require('socket.io')(http);
	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
		socket.on('message', function(msg){
			console.log("Message Received:", msg);
			io.emit('message', msg);
		});
	});
};