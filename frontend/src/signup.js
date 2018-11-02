import React, { Component } from 'react';
import {signup} from './serverService';

class Signup extends Component {
  
	handleSubmit(e) {
		e.preventDefault();

		signup(this.username.value, this.email.value, this.password.value)
		.then(data => {
			if(data.error)
				alert("ERROR: " + data.error);
			else
				alert("Criado com sucesso!");
		});
	}

	render() {
		return (
			<form onSubmit={e => this.handleSubmit(e)}>
				<input ref={e => this.username = e} autoComplete={'off'} type={'text'} placeholder={'Username'}/>
				<input ref={e => this.email = e} autoComplete={'off'} type={'email'} placeholder={'Email'}/>
				<input ref={e => this.password = e} autoComplete={'off'} type={'password'} placeholder={'Password'}/>
				<button>Signup</button>
			</form>
		);
	}
}

export default Signup;