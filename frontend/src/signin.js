import React, { Component } from 'react';
import {signin} from './serverService';

class Signin extends Component {
  
	handleSubmit(e) {
		e.preventDefault();

		signin(this.email.value, this.password.value)
		.then(data => {
			console.log(data);
			if(data.error)
				alert("ERROR: " + data.error);
			else
				alert("Login com sucesso!");
		});
	}

	render() {
		return (
			<form onSubmit={e => this.handleSubmit(e)}>
				<input ref={e => this.email = e} autoComplete={'off'} type={'email'} placeholder={'Email'}/>
				<input ref={e => this.password = e} autoComplete={'off'} type={'password'} placeholder={'Password'}/>
				<button>Login</button>
			</form>
		);
	}
}

export default Signin;