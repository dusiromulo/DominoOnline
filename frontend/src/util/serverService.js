let userAuthToken;
let userRefreshToken;
const API_URL = 'http://192.168.0.101:8000/';

function refreshToken() {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}refresh`, {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({token: userRefreshToken})
		}).then(res => { 
			if (res.status === 200) {
				return resolve(res.json());
			} else {
				console.log("ERROR REFRESH TOKEN!!!!!!", res);
				return reject({});
			}
		});
	});
}

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

	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${url}`, data)
		.then(
			res => {
				if (res.status === 200) {
					return resolve(res.json());
				} else {
					res.json().then(errorData => {
						if (errorData.message === 'token_expired') {
							refreshToken()
							.then(newData => {
								setUserToken(newData.auth, newData.refresh);
								if (url === 'profile') {
									body.token = newData.auth;
									return resolve(makeFetch(url, method, body));
								}
								return resolve(makeFetch(url, method, body, newData.auth));
							})
							.catch(err => {
								console.log("ERRO ATUALIZANDO TOKEN!", err);
							});
						} else {
							return reject(errorData);
						}
					});
				}
			},
			error => {
				console.log("SERVER SERVICE ERRO!!!", error);
				return reject(error);
			}
		);
	})
}

export function setUserToken(auth, refresh) {
	userAuthToken = auth;
	userRefreshToken = refresh;
    localStorage.setItem("authToken", auth);
    localStorage.setItem("refreshToken", refresh);
}

export function removeUserToken() {
	userAuthToken = null;
	userRefreshToken = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
}

export function sendMessage(msg) {
	return makeFetch('message', 'post', {'message': msg}, userAuthToken);
}

export function getMessages() {
	return makeFetch('message', 'get', null, userAuthToken);
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
    return makeFetch('profile', 'post', {token: userAuthToken});
}