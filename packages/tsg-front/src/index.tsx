import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import configureStore from './configureStore';

import Main from './main';

const history = createHistory();

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <Main store={store} history={history} />,
  document.getElementById('root-container'),
);
