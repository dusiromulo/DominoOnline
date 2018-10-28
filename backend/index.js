const app = require('express')();
const http = require('http').Server(app);
const chatInit = require('./chat');
const dbInit = require('./db');
const routesInit = require('./config/routes');
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const conn = dbInit(
	_ => {
		http.listen(8000, function() {
		  	console.log('listening on *:8000');
		  	io.on('connection', function(socket){
			  	//Chat
				chatInit(socket, io);
			});

			// Allow all origins
			app.use(function(req, res, next) {
				res.header("Access-Control-Allow-Origin", "http://localhost:3000");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				next();
			});
			
			// To read req.body
			app.use(bodyParser.urlencoded({ extended: true }));
			app.use(bodyParser.json());

			// Use sessions for tracking logins
			// app.use(session({
			// 	secret: 'work hard',
			// 	resave: true,
			// 	saveUninitialized: false
			// }));
			//Routes
			routesInit(app);
		});
	}	
);