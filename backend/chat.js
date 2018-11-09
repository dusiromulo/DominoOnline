class Chat {
    constructor(io) {
		this.io = io;

        io.on('connection', function (socket) {
            console.log('a user connected');
            socket.join('lobby');

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
	}

	emitMessage(message) {
        this.io.sockets.in('lobby').emit('message', message);
	}
}

module.exports = Chat;