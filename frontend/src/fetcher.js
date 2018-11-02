const serverUrl = 'http://localhost:8000/';

function _fetch(url, method, body, token) {
    let headers = {'Content-Type': 'application/json'};
    if(token) {
        headers['authorization'] = `Bearer ${token}`;
    }

    return fetch(`${serverUrl}${url}`,
        { method: method
        , headers: headers
        , body: JSON.stringify(body)
        })
        .then(res => {
            return res.json();
        })
}

function signin(body) {
    return _fetch('signin', 'post', body);
}

function signup(body) {
    return _fetch('signup', 'post', body);
}

function profile(body) {
    let token;
    return _fetch('profile', 'post', body, token);
}

export default {
    signin,
    signup,
    profile
};