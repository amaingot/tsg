import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as reducers from '../reducers';

class PrivateRoute extends React.Component {
	static propTypes = {
		component: PropTypes.node.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
	};

	render() {
		const { component: Component, isAuthenticated, ...rest } = this.props;
		return (
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
	}
}

const mapStateToProps = state => ({
	isAuthenticated: reducers.isAuthenticated(state),
});

export default connect(
	mapStateToProps,
	null
)(PrivateRoute);
