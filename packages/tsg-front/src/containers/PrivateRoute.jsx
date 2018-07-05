import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as reducers from '../reducers';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
            state: { from: props.location },
            search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
					}}
				/>
			)
		}
	/>
);

const mapStateToProps = state => ({
	isAuthenticated: reducers.isAuthenticated(state),
});

export default connect(
	mapStateToProps,
	null
)(PrivateRoute);
