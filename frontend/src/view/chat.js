import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import dateFormat from 'dateformat';

import { openSocketConnection, closeSocketConnection, subscribeMsgs } from '../util/socket';
import { sendMessage, getMessages } from '../util/serverService';

import '../css/chat.css';

let scroll = Scroll.animateScroll;


class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {msgLst : []};
		this.appendMessage = this.appendMessage.bind(this);
		openSocketConnection();
	}

	formatMessage(model, key) {
		const formatStr = 'dd/mm/yyyy HH:MM:ss';
		const date = dateFormat(new Date(model.createdAt), formatStr);
		return (<li key={key}>[{date}]: {model.string}</li>);
	}

	appendMessage(model) {
		this.setState({
			msgLst : this.state.msgLst.concat(this.formatMessage(model, this.state.msgLst.length))
		});
	}

	setMessageList(models) {
		this.setState({
			msgLst : models.map((it) => this.formatMessage(it, models.indexOf(it)))
		});
	}

	scrollToBottomList() {
		scroll.scrollToBottom({containerId : 'messages'});
	}

	componentDidMount() {
		getMessages()
		.then(data => {
			this.setMessageList(data);
			subscribeMsgs(this.appendMessage);
			this.scrollToBottomList();
		})
		.catch(err => {
			console.log("ERRO GET MESSAGES!", err);
		});
	}

	componentDidUpdate() {
		this.scrollToBottomList();
	}

	logout = () => {
		closeSocketConnection();
		localStorage.removeItem("jwtToken");
		this.props.onLogout();
	}

	handleSubmit(e) {
		e.preventDefault();
		sendMessage(this.input.value, this.props.user)
		.then((data) => { console.log("SEND MESSAGE!", data); this.input.value = ''; })
		.catch(err => {
			console.log("ERRO SEND MESSAGE!", err);
		});
	}
  
	render() {
		return (
			<div>
				<button className={'logout'} onClick={this.logout}>Logout</button>
				<ul id="messages">{this.state.msgLst}</ul>
				<form className={'create-msg'} onSubmit={e => this.handleSubmit(e)}>
					<input ref={e => this.input = e} autoComplete='off' placeholder='Digite sua mensagem' /><button>Send</button>
				</form>
			</div>
		);
	}
}

export default Chat;
