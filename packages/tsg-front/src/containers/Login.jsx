import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from '../components/LoginForm';
import { login } from '../actions/AuthActions';
import { authErrors, isAuthenticated } from '../reducers';

const Login = props => {
	if (props.isAuthenticated) {
		return (
			<Redirect
				to={{
					pathname: '/',
					search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
				}}
			/>
		);
	} else {
		return (
			<div className="login-page">
				<LoginForm {...props} />
			</div>
		);
	}
};

const mapStateToProps = state => ({
	errors: authErrors(state),
	isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
	onSubmit: (username, password) => {
		login(username, password)(dispatch);
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
