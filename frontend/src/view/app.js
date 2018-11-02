import React, { Component } from 'react';
import Chat from './chat';
import Signup from './signup';
import Signin from './signin';
import {profile} from '../util/serverService';

class App extends Component {
	constructor(props) {
		super(props);
		if (props.user) {
		    console.log(JSON.stringify({token: props.user}));
		    profile()
		    .then((data) => {
                console.log("profile data", data);
                this.setState({currPage: "chat", currUser: data.user});
            });
		}
		this.state = {currPage: "signin"};
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

	render() {
		let page;
		if(this.state.currPage === "signin") {
			page = <Signin onClick={this.onOpenSignup} onLogin={this.onOpenChat}/>;
		} else if(this.state.currPage === "signup") {
			page = <Signup onClick={this.onOpenSignin} onRegister={this.onOpenChat}/>;
		} else if(this.state.currPage === "chat") {
			page = <Chat user={this.state.currUser}/>;
		}
		return (<div>{page}</div>);	
	}
}

export default App;
