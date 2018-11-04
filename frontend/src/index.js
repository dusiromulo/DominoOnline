import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/app';
import {setUserToken} from './util/serverService';
import * as serviceWorker from './serviceWorker';

function loadLoggedUser() {
    let auth = localStorage.getItem("authToken");
    let refresh = localStorage.getItem("refreshToken");
    if(!auth || auth === "") {//if there is no token, dont bother
        return <App user={0}/>;
    } else {
    	setUserToken(auth, refresh);
        return <App user={auth}/>;
    }
}

ReactDOM.render(loadLoggedUser(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
