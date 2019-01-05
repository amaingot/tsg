import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Store } from 'redux';

import { ApplicationState } from 'store/index';

import Dashboard from 'layouts/Dashboard';
import Pages from 'layouts/Pages';
import LandingPage from 'pages/LandingPage';
import CustomRoute from 'utils/CustomRoute';

import './styles.scss';

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
            <CustomRoute path="/" exact component={LandingPage} />
            <CustomRoute path="/app" privatePath component={Dashboard} />
            <CustomRoute path="/" component={Pages} />
            <CustomRoute component={() => <div>Not Found</div>} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
