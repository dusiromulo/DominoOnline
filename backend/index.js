const app = require('express')();
const http = require('http').Server(app);
const chatInit = require('./chat');
const dbInit = require('./db');
const routesInit = require('./config/routes');

const conn = dbInit(
	_ => {
		http.listen(8000, function() {
		  	console.log('listening on *:8000');
		  	//Chat
			chatInit(http);
			// Allow all origins
			app.use(function(req, res, next) {
				res.header("Access-Control-Allow-Origin", "http://localhost:3000");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				next();
			});
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