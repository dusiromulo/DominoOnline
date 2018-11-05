import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/app.css';

import { profile } from '../util/serverService';
import { loginUser, logoutUser, profileUser, openSigninOrSignup } from "../actions/app";


class App extends Component {
	componentDidMount() {
		if (this.props.auth) {
		    profile()
		    .then((data) => {
                this.props.onUserProfile(data.user);
            })
			.catch(err => {
				console.log("ERRO PROFILE!", err);
			});
		}  else {
			this.props.onUserChangePage(true);
		}
	}

	render() {
		return (<>{this.props.currPage}</>);	
	}
}

const mapStateToProps = state => {
	return {
		auth: state.app.auth,
		currPage: state.app.currPage
	};
};

const mapDispatchToProps = dispatch => ({
	onUserProfile: (user) => dispatch(profileUser(user)),
	onUserChangePage: (isSignin) => dispatch(openSigninOrSignup(isSignin))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);