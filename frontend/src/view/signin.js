import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser, openSigninOrSignup } from "../actions/app";
import {signin, setUserToken} from '../util/serverService';
import '../css/form.css';

class Signin extends Component {
	handleSubmit(e) {
		e.preventDefault();

		signin(this.email.value, this.password.value)
		.then(data => {
			if (data.error) {
				alert("ERROR: " + data.error);
			} else {
				setUserToken(data.auth, data.refresh);
				alert(`Login com sucesso!\n\nBem vindo ${data.user.name}!`);
				this.props.onUserLoginOrRegister(data.user, data.auth, data.refresh);
			}
		})
		.catch(err => {
			console.log("ERRO SIGNIN!", err);
		});		
	}

	render() {
		return (
			<div className='center-vertical'>
				<form className='center-form' onSubmit={e => this.handleSubmit(e)}>
					<input ref={e => this.email = e} type='email' placeholder='Email'/>
					<input ref={e => this.password = e} autoComplete='off' type='password' placeholder='Password'/>
					<button>Entrar</button>
				</form>
				<button className='top-right green-bg' onClick={() => this.props.onUserChangePage(false)}>Registrar</button>
			</div>
		);
	}
}

// export default Signin;
const mapDispatchToProps = dispatch => ({
	onUserLoginOrRegister: (user, auth, refresh) => dispatch(loginUser(user, auth, refresh)),
	onUserChangePage: (isSignin) => dispatch(openSigninOrSignup(isSignin))
});

export default connect(null, mapDispatchToProps)(Signin);