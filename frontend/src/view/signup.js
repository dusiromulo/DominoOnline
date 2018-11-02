import React, { Component } from 'react';
import {signup} from '../util/serverService';

class Signup extends Component {
	handleSubmit(e) {
		e.preventDefault();

		signup(this.username.value, this.email.value, this.password.value)
		.then(data => {
			if(data.error)
				alert("ERROR: " + data.error);
			else {
                sessionStorage.setItem("jwtToken", data.token);
				alert("Criado com sucesso!");
				this.props.onRegister();
			}
		});	
	}

	render() {
		return (
			<div>
				<form onSubmit={e => this.handleSubmit(e)}>
					<input ref={e => this.username = e} type={'text'} placeholder={'Username'}/>
					<input ref={e => this.email = e} type={'email'} placeholder={'Email'}/>
					<input ref={e => this.password = e} autoComplete={'off'} type={'password'} placeholder={'Password'}/>
					<button>Registrar</button>
				</form>
				<button onClick = {this.props.onClick}>Entrar</button>
			</div>
		);
	}
}

export default Signup;