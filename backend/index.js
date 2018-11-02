const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');
// TODO: gambi
module.exports = {emitMessage: (msg) => {io.emit('message', msg)}};
// Inits
const Chat = require('./chat');
const dbInit = require('./db');
const routesInit = require('./config/routes');



// TODO colocar num .env
const user = require('./control/user');
const userList = [];

const conn = dbInit(
	_ => {
		http.listen(8000, '0.0.0.0',function() {
		 	console.log('listening on 0.0.0.0:8000');

            const jwt = require("jsonwebtoken");
			app.use(function(req, res, next) {
                // Allow localhost ou outro
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");

                // Verifica se existe um token nos headers
                let token = req.headers['authorization'];
                if (!token) return next(); // Se nao existe, continua normalmente a execucao

                token = token.replace('Bearer ', '');
                jwt.verify(token, user.jwtSecret, function(err, user) {
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            message: 'Please register Log in using a valid email to submit posts'
                        });
                    } else {
            			console.log("user!!", user);
                        req.user = user; // Seta o usuario na request, assim basta acessar req.user nas rotas
                        next();
                    }
                });
			});
			
			// To read req.body
			app.use(bodyParser.urlencoded({ extended: true }));
			app.use(bodyParser.json());

		  	// Socket
		  	io.on('connection', function(socket){
			  	// Chat
				// chat.init(socket, io);
				const chatConn = new Chat(socket, io, (thisInst) => {
					const index = userList.indexOf(thisInst);
					if (index > -1) {
					  userList.splice(index, 1);
					}
				});
				userList.push(chatConn);
			});

			// Routes
			routesInit(app);
		});
	}	
);