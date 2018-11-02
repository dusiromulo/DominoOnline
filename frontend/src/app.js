import React, { Component } from 'react';
import Chat from './view/chat';
import Signup from './view/signup';
import Signin from './view/signin';

class App extends Component {
	constructor(props) {
		super(props);
		if (props.user) {
		    console.log(JSON.stringify({token: props.user}));
            fetch('http://localhost:8000/profile', {
                method: 'post',
                accept: 'application/json',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({token: props.user})
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log("profile data", data);
                this.setState({currPage: "chat", currUser: data.user});
            });
		}
		this.state = {currPage: "signin"};
	}

	componentDidMount() {
		
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
