import React, { Component } from 'react';

class Signup extends Component {
  
	handleSubmit(e) {
		e.preventDefault();

		fetch('http://localhost:8000/signup', 
			{ method: 'post'
			, headers: {'Content-Type':'application/json'}
			, body: 
				JSON.stringify(
				{ "name": this.username.value
				, "email": this.email.value
				, "password": this.password.value })
		})		
		.then(res => {
			return res.json();
		})	
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