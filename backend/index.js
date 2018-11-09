const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Inits
const Chat = require('./chat');
const dbInit = require('./db');
const routesInit = require('./config/routes');

// Socket
const chat = new Chat(io);

const conn = dbInit(
	_ => {
        http.listen(8000, '0.0.0.0', function () {
		 	console.log('listening on 0.0.0.0:8000');
			// Routes
            routesInit(app, chat);
		});
	}	
);