import React, { Component } from 'react';

class Signin extends Component {
	handleSubmit(e) {
		e.preventDefault();

		fetch('http://localhost:8000/signin', 
			{ method: 'post'
			, headers: {'Content-Type':'application/json'}
			, body: 
				JSON.stringify(
				{ "email": this.email.value
				, "password": this.password.value })
		})		
		.then(res => {
			return res.json();
		})	
		.then(data => {
			console.log(data);
			if(data.error)
				alert("ERROR: " + data.error);
			else {
                sessionStorage.setItem("jwtToken", data.token);
				alert("Login com sucesso!");
				this.props.onLogin();
			}
		});		
	}

	render() {
		return (
			<div>
				<form onSubmit={e => this.handleSubmit(e)}>
					<input ref={e => this.email = e} autoComplete={'off'} type={'email'} placeholder={'Email'}/>
					<input ref={e => this.password = e} autoComplete={'off'} type={'password'} placeholder={'Password'}/>
					<button>Entrar</button>
				</form>
				<button onClick = {this.props.onClick}>Registrar</button>
			</div>
		);
	}
}

export default Signin;