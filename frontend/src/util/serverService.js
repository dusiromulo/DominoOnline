let userToken;

function makeFetch(url, method, body, token) {
	let data = {
		method: method,
		headers: {'Content-Type':'application/json'}
	};

    if (body) {
		data.body = JSON.stringify(body);
	}
	
	if (token) {
        data.headers['authorization'] = `Bearer ${token}`;
    }

	return fetch(`http://192.168.0.109:8000/${url}`, data)		
	.then(res => {
		return res.json();
	});
}

export function setUserToken(token) {
	userToken = token;
}

export function sendMessage(msg) {
	return makeFetch('message', 'post', {'message': msg}, userToken);
}

export function getMessages(token) {
	return makeFetch('message', 'get', null, userToken);
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
	return makeFetch('signup', 'post', body);
}

export function profile() {
    return makeFetch('profile', 'post', {token: userToken});
}