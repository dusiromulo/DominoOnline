import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import rootReducers from './reducers/index';
import * as serviceWorker from './serviceWorker';

import App from './view/app';
import { setUserToken } from './util/serverService';

// const loggerMiddleware = createLogger();


/* eslint-disable no-underscore-dangle */


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...thunkMiddleware),
  // other store enhancers if any
);

export const store = createStore(rootReducers, enhancer);

// export const store = createStore(
// 	rootReducers,
// 	applyMiddleware(
// 		thunkMiddleware, // lets us dispatch() functions
// 		// loggerMiddleware // neat middleware that logs actions
// 	),
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );
/* eslint-enable */

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
