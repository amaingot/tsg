import * as Sentry from '@sentry/browser';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureStore from './configureStore';

import Main from './main';

const history = createBrowserHistory();

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

Sentry.init({
  dsn: 'https://6b4dbd70df3a4cee8ce931a9cdfa87ac@sentry.io/1263890',
  environment: App.env,
});

ReactDOM.render(
  <Main store={store} history={history} />,
  document.getElementById('root-container')
);
