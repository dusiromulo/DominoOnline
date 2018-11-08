import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';

import { store } from '../index';
import { logoutUser } from '../actions/app';
import { getMessages, sendMessage, incomeMessage } from '../actions/chat';
import { openSocketConnection, closeSocketConnection, subscribeMsgs } from '../util/socket';
import { /*sendMessage, getMessages,*/ removeUserToken } from '../util/serverService';

import '../css/chat.css';

let scroll = Scroll.animateScroll;


class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {msgLst : []};
		// this.appendMessage = this.appendMessage.bind(this);
		openSocketConnection();
		store.dispatch(getMessages());
	}

	// appendMessage(model) {
	// 	this.setState({
	// 		msgLst : this.state.msgLst.concat(this.formatMessage(model, this.state.msgLst.length))
	// 	});
	// }

	// setMessageList(models) {
	// 	this.setState({
	// 		msgLst : models.map((it) => this.formatMessage(it, models.indexOf(it)))
	// 	});
	// }

	scrollToBottomList() {
		scroll.scrollToBottom({containerId : 'messages'});
	}

	componentDidMount() {
		console.log("CHAT componentDidMount", this.props.messages);
		// if (!!this.props.messages) {
		// 	this.setMessageList(this.props.messages);
		// }
		subscribeMsgs(msg => store.dispatch(incomeMessage(msg)));
		this.scrollToBottomList();
		// getMessages()
		// .then(data => {
		// 	
		// 	subscribeMsgs(this.appendMessage);
		// })
		// .catch(err => { console.log("ERRO GET MESSAGES!", err); });
	}

	componentDidUpdate() {
		console.log("CHAT componentDidUpdate", this.props.messages);
		// this.setMessageList(this.props.messages);
		this.scrollToBottomList();
	}

	logout = () => {
		removeUserToken();
		closeSocketConnection();
		this.props.onUserLogout();
	}

	handleSubmit(e) {
		e.preventDefault();

		store.dispatch(sendMessage(this.input.value));
		this.input.value = '';
		// sendMessage(this.input.value)
		// .then(data => { this.input.value = ''; })
		// .catch(err => { console.log("ERRO SEND MESSAGE!", err); });
	}
  
	render() {
		return (
			<div>
				<button className={'logout'} onClick={this.logout}>Logout</button>
				<ul id="messages">{this.props.messages}</ul>
				<form className={'create-msg'} onSubmit={e => this.handleSubmit(e)}>
					<input ref={e => this.input = e} autoComplete='off' placeholder='Digite sua mensagem' /><button>Send</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		messages: state.app.messages,
		newMsg: state.app.newMsg
	};
};

const mapDispatchToProps = dispatch => ({
	onUserLogout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);