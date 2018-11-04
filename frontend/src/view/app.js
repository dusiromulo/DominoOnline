import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import '../css/app.css';

import Chat from './chat';
import Signup from './signup';
import Signin from './signin';
import {profile} from '../util/serverService';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {currPage: ""};
	}

	componentDidMount() {
		if (this.props.user) {
		    profile(this.props.user)
		    .then((data) => {
                this.setState({currPage: "chat", currUser: data.user});
            })
			.catch(err => {
				console.log("ERRO PROFILE!", err);
			});
		} else {
			this.setState({currPage: "signin"});
		}
	}

	onOpenSignup = () => {
		this.setState({currPage: "signup"});
	};

	onOpenSignin = () => {
		this.setState({currPage: "signin"});
	};

	onOpenChat = () => {
		this.setState({currPage: "chat"});
	};

	onLogout = () => {
		this.setState({currPage: "signin", currUser: {}});
	};

	render() {
		let page;
		if (this.state.currPage === "signin") {
			page = <Signin onClick={this.onOpenSignup} onLogin={this.onOpenChat}/>;
		} else if (this.state.currPage === "signup") {
			page = <Signup onClick={this.onOpenSignin} onRegister={this.onOpenChat}/>;
		} else if (this.state.currPage === "chat") {
			page = <Chat user={this.props.user} onLogout={this.onLogout}/>;
		} else {
			page = <Loader color="#CCCCCC" height="100"	width="100"/>;
		}

		return (<div>{page}</div>);	
	}
}

export default App;
