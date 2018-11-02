import React, { Component } from 'react';
import {signin, setUserToken} from '../util/serverService';
import '../css/form.css';

class Signin extends Component {
	handleSubmit(e) {
		e.preventDefault();

		signin(this.email.value, this.password.value)
		.then(data => {
			if(data.error)
				alert("ERROR: " + data.error);
			else {
				setUserToken(data.token);
                localStorage.setItem("jwtToken", data.token);
				alert("Login com sucesso!");
				this.props.onLogin();
			}
		});		
	}

	render() {
		return (
			<div>
				<form className={'center-form'} onSubmit={e => this.handleSubmit(e)}>
					<input ref={e => this.email = e} type={'email'} placeholder={'Email'}/>
					<input ref={e => this.password = e} autoComplete={'off'} type={'password'} placeholder={'Password'}/>
					<button>Entrar</button>
				</form>
				<button className={'top-right green-bg'} onClick = {this.props.onClick}>Registrar</button>
			</div>
		);
	}
}

export default Signin;