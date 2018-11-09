import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Scroll from 'react-scroll';

import {store} from '../index';
import {logoutUser} from '../actions/app';
import {getMessages, incomeMessage, sendMessage} from '../actions/chat';
import ChatSocket from '../util/socket';
import {removeUserToken} from '../util/serverService';
import '../css/chat.css';

let scroll = Scroll.animateScroll;

class Chat extends Component {
    logout = () => {
        removeUserToken();
        this.socket.closeSocketConnection();
        this.props.onUserLogout();
    };

	constructor(props) {
		super(props);
        this.socket = new ChatSocket();
        this.socket.openSocketConnection();
		store.dispatch(getMessages());
	}

    scrollToBottomList() {
        scroll.scrollToBottom({containerId: 'messages'});
    }

    componentDidUpdate() {
        console.log("CHAT componentDidUpdate", this.props.messages);
        this.scrollToBottomList();
	}

	componentDidMount() {
        this.socket.subscribeMsgs(msg => {
            console.log("Uma string:", msg);
            store.dispatch(incomeMessage(msg))
        });

		this.scrollToBottomList();
	}

	handleSubmit(e) {
		e.preventDefault();

		store.dispatch(sendMessage(this.input.value));
		this.input.value = '';
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