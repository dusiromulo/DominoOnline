var Message = require('./model/message');

module.exports = (socket, io) => {
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
};