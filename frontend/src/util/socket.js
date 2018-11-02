import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeMsgs(cb) {
	socket.on('message', cb);
} 

function sendMsg(msg) {
	socket.emit('message', msg);
}

export { subscribeMsgs, sendMsg }
