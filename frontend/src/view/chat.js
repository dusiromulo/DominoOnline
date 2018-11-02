import React, { Component } from 'react';
import { subscribeMsgs, sendMsg } from '../util/socket';
import dateFormat from 'dateformat';
// import './chat.css';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {msgLst : []};
		this.appendMessage = this.appendMessage.bind(this);
	}

	formatMessage(model) {
		const formatStr = 'dd/mm/yyyy hh:MM:ss';
		const date = dateFormat(new Date(model.createdAt), formatStr);
		return (<li>[{date}]: {model.string}</li>);
	}

	appendMessage(model) {
		this.setState({
			msgLst : this.state.msgLst.concat(this.formatMessage(model))
		});
	}

	setMessageList(models) {
		this.setState({
			msgLst : models.map(this.formatMessage)
		});
	}

	componentWillMount() {
		fetch('http://localhost:8000/message')
		.then(res => {
			return res.json()
		})
		.then(data => {
			this.setMessageList(data);
			subscribeMsgs(this.appendMessage);
		});		
	}

	handleSubmit(e) {
		const msg = `${this.props.user.name}: ${this.input.value}`;
		sendMsg(msg);
		this.input.value = '';
		e.preventDefault();
	}
  
	render() {
		return (
			<div>
			<ul>{this.state.msgLst}</ul>
			<form onSubmit={e => this.handleSubmit(e)}>
				<input ref={e => this.input = e} autoComplete={'off'} /><button>Send</button>
			</form>
			</div>
		);
	}
}

export default Chat;
