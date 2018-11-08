import openSocket from 'socket.io-client';
let socket;

function openSocketConnection() {
	socket = openSocket('http://192.168.0.129:8000');
}

function closeSocketConnection() {
	socket.close();
}

function subscribeMsgs(cb) {
	if (socket && socket.connected) {
		socket.on('message', cb);
		return;
	}
	console.log("Error! Socket not opened");
} 

function sendMsg(msg) {
	if (socket && socket.connected) {
		socket.emit('message', msg);
		return;
	}
	console.log("Error! Socket not opened");
}

export { openSocketConnection, closeSocketConnection, subscribeMsgs, sendMsg }
