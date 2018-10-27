var Message = require('./model/message');

module.exports = http => {
	var io = require('socket.io')(http);
	io.on('connection', function(socket){
		console.log('a user connected');
		
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
		
		socket.on('message', function(msg){
			var messageSchema = new Message({string : msg});
			messageSchema.save().then(msgModel => { 
				io.emit('message', msgModel);
			});
		});		
	});
};