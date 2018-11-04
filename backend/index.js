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
const UserControl = require('./control/user');
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
                UserControl.verifyToken(token, function(err, user) {
                    if (err && err.name !== 'TokenExpiredError') { // Algum santo tentando hackear
                    	console.log("HACKER!", err);
                        return res.status(401).json({
                            success: false,
                            message: 'hacker'
                        });
                    } else if (err) { // Token inválido!
                    	console.log("TOKEN EXPIRADO!", err);
                        return res.status(403).json({
                            success: false,
                            message: 'token_expired'
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