import openSocket from 'socket.io-client';

class ChatSocket {

    openSocketConnection = () => {
        this.socket = openSocket('http://192.168.0.101:8000');
        console.log("open this.socket:", this.socket);
    };
    closeSocketConnection = () => {
        this.socket.close();
        console.log("close this.socket:", this.socket);
    };
    subscribeMsgs = (cb) => {
        console.log("Socket conn", this.socket.connected);
        // if (this.socket.connected) {
        this.socket.on('message', cb);

        // }
        // console.log("Error! Socket not opened");
    };
    sendMsg = (msg) => {
        if (this.socket && this.socket.connected) {
            this.socket.emit('message', msg);
            return;
        }
        console.log("Error! Socket not opened");
    };

    constructor(props) {
        this.socket = null;
    }
}

export default ChatSocket;
