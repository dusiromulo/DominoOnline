// const Message = require('./control/message');
// const index = require('./index');

class Chat {
	constructor(socket, io, cbRemove) {
		this.socket = socket;
		this.io = io;

		console.log('a user connected');
		// Message.create(io);
		socket.on('disconnect', function(){
			console.log('user disconnected');
			cbRemove(this);
		});
	}

	emitMessage(message) {
		this.io.emit('message', message);
	}
}

module.exports = Chat;