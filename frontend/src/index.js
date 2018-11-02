import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/app';
import {setUserToken} from './util/serverService';
import * as serviceWorker from './serviceWorker';

function loadLoggedUser() {
    let token = localStorage.getItem("jwtToken");
    if(!token || token === "") {//if there is no token, dont bother
        return <App user={0}/>;
    } else {
    	setUserToken(token);
        return <App user={token}/>;
    }
}

ReactDOM.render(loadLoggedUser(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
