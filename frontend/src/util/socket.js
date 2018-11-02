import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.0.109:8000');

function subscribeMsgs(cb) {
	socket.on('message', cb);
} 

function sendMsg(msg) {
	socket.emit('message', msg);
}

export { subscribeMsgs, sendMsg }
