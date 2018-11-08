import React from 'react';
import Loader from 'react-loader-spinner';
import dateFormat from 'dateformat';

import Chat from '../view/chat';
import Signup from '../view/signup';
import Signin from '../view/signin';

let auth = localStorage.getItem("authToken");
let refresh = localStorage.getItem("refreshToken");
let initialState = {
	user: null, 
	auth: auth, 
	refresh: refresh,
	currPage: <div className='align-center'><Loader type='TailSpin' color="#CCCCCC" height="100" width="100"/></div>
};

const formatMessage = (model, key) => {
	const formatStr = 'dd/mm/yyyy HH:MM:ss';
	const date = dateFormat(new Date(model.createdAt), formatStr);
	return (<li key={key}>[{date}] {model.user.name}: {model.string}</li>);
};

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
			return {
				user: action.user,
				auth: action.auth,
				refresh: action.refresh,
				currPage: <Chat />
			}
		case 'USER_LOGOUT':
			return {
				user: null,
				auth: null,
				refresh: null,
				currPage: <Signin />
			}
		case 'USER_PROFILE':
			return {
				...state,
				user: action.user,
				currPage: <Chat />
			}
		case 'CHANGE_PAGE':
			return {
				...state,
				currPage: action.isSignin? <Signin />: <Signup />
			}
		case 'REQ_MESSAGES':
			return {
				...state,
				loading: true
			}
		case 'RES_MESSAGES':
			return {
				...state,
				loading: false,
				messages: action.data.map(model => { return formatMessage(model, action.data.indexOf(model)); })
			}
		case 'REQ_SEND_MESSAGE':
			return {
				...state,
				loading: true
			}
		case 'RES_SEND_MESSAGE':
			return {
				...state,
				loading: false
			}
		case 'RECEIVED_MESSAGE':
			console.log("RECEIVED NEW MESSAGE", action);
			return {
				...state,
				messages: [...state.messages, formatMessage(action.message, state.messages.length)]
			}
		default:
			return state
	}
}


export default AppReducer;