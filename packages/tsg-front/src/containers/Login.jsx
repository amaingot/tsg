import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';
import { login } from '../actions/AuthActions';
import { authErrors, isAuthenticated } from '../reducers';
import frontLogo from '../static/frontpageLogo.png';

const LoginContainer = styled.div`
	width: 300px;
	height: 300px;
  position: absolute;
  margin: auto;
	top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const BigImage = styled.img`
	width: 100%;
	margin-bottom: 20px;
`;

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
			<LoginContainer>
				<BigImage src={frontLogo} />
				<LoginForm {...props} />
			</LoginContainer>
		);
	}
};

const mapStateToProps = state => {
	return {
		errors: authErrors(state),
		isAuthenticated: isAuthenticated(state),
	};
};

const mapDispatchToProps = dispatch => ({
	onSubmit: (username, password) => {
		login(username, password)(dispatch);
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
