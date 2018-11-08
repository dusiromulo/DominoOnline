import React from 'react';
import Loader from 'react-loader-spinner';
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
		default:
			return state
	}
}


export default AppReducer;