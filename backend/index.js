const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');
// Inits
const chatInit = require('./chat');
const dbInit = require('./db');
const routesInit = require('./config/routes');

const conn = dbInit(
	_ => {
		http.listen(8000, function() {
		 	console.log('listening on *:8000');

		  	// Socket
		  	io.on('connection', function(socket){
			  	// Chat
				chatInit(socket, io);
			});


            const jwt = require("jsonwebtoken");
			app.use(function(req, res, next) {
                // Allow localhost ou outro
				res.header("Access-Control-Allow-Origin", "http://localhost:3000");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                // Verifica se existe um token nos headers
                let token = req.headers['authorization'];
                if (!token) return next(); // Se nao existe, continua normalmente a execucao

                token = token.replace('Bearer ', '');

                jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            message: 'Please register Log in using a valid email to submit posts'
                        });
                    } else {
                        req.user = user; // Seta o usuario na request, assim basta acessar req.user nas rotas
                        next();
                    }
                });
			});
			
			// To read req.body
			app.use(bodyParser.urlencoded({ extended: true }));
			app.use(bodyParser.json());

			// Routes
			routesInit(app);
		});
	}	
);