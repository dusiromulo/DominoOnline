function makeFetch(url, method, body) {
	let data = {
		method: method,
		headers: {'Content-Type':'application/json'}
	};

	if (body) {
		data.body = JSON.stringify(body);
	}

	return fetch(`http://localhost:8000/${url}`, data)		
	.then(res => {
		return res.json();
	});
}

export function sendMessage(msg) {
	return makeFetch('message', 'post', {'message': msg});
}

export function getMessages() {
	return makeFetch('message', 'get');
}

export function signin(email, password) {
	const body = { 
		'email': email, 
		'password': password 
	};
	return makeFetch('signin', 'post', body);
}

export function signup(name, email, password) {
	const body = { 
		'name': name, 
		'email': email, 
		'password': password 
	};
	return makeFetch('signin', 'post', body);
}