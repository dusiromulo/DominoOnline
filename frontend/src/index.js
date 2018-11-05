import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducers from './reducers/index';
import * as serviceWorker from './serviceWorker';

import App from './view/app';
import { setUserToken } from './util/serverService';

const store = createStore(rootReducers);

function loadLoggedUser() {
    let auth = localStorage.getItem("authToken");
    let refresh = localStorage.getItem("refreshToken");
    if (auth && auth !== "") {
        setUserToken(auth, refresh);
    }
    let ret = <Provider store={store}><App/></Provider>;
    return ret;
}

ReactDOM.render(loadLoggedUser(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
