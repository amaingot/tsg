import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { ApplicationState } from './store';

import TestPage from 'pages/TestPage';
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
            <Route path="/" exact component={TestPage} />
            <Route component={() => <div>Not Found</div>} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
