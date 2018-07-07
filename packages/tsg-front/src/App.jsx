import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { Layout } from 'antd';

import Home from './containers/Home';
import About from './containers/About';
import TopNav from './components/TopNav';
import PageFooter from './components/PageFooter';

import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';

class App extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
	};
	render() {
		const { history } = this.props;
		return (
			<ConnectedRouter history={history}>
				<Layout>
					<TopNav />
					<Layout.Content>
						<Switch>
							<Route path="/" component={Home} />
							<Route path="/about" component={About} />
							<Route exact path="/login/" component={Login} />
						</Switch>
					</Layout.Content>
					<PageFooter />
				</Layout>
			</ConnectedRouter>
		);
	}
}

export default App;
