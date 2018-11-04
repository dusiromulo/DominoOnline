import React, { Component } from 'react';
import {signup, setUserToken} from '../util/serverService';
import '../css/form.css';

class Signup extends Component {
	handleSubmit(e) {
		e.preventDefault();

		signup(this.username.value, this.email.value, this.password.value)
		.then(data => {
			if (data.error) {
				alert("ERROR: " + data.error);
			} else {
				setUserToken(data.auth, data.refresh);
				alert(`Usuário criado com sucesso!\n\nBem vindo ${data.user.name}!`);
				this.props.onRegister();
			}
		})
		.catch(err => {
			console.log("ERRO SIGNIN!", err);
		});	
	}

	render() {
		return (
			<div className='center-vertical'>
				<form className={'center-form'} onSubmit={e => this.handleSubmit(e)}>
					<input ref={e => this.username = e} type={'text'} placeholder={'Username'}/>
					<input ref={e => this.email = e} type={'email'} placeholder={'Email'}/>
					<input ref={e => this.password = e} autoComplete={'off'} type={'password'} placeholder={'Password'}/>
					<button>Registrar</button>
				</form>
				<button className={'top-right green-bg'} onClick={this.props.onClick}>Entrar</button>
			</div>
		);
	}
}

export default Signup;