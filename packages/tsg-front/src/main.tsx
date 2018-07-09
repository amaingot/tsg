import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { ApplicationState } from './store';

import AccountDetailsPage from './pages/AccountDetailsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';

// Any additional component props go here.
interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

export default class Main extends React.Component<MainProps> {
  public render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact={true} path='/' component={HomePage} />
            <Route path='/login' component={LoginPage} />
            <PrivateRoute path='/account' component={AccountDetailsPage} />
            <Route component={() => <div>Not Found</div>} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
