import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import Amplify from '@aws-amplify/core';

Sentry.init({dsn: process.env.REACT_APP_SENTRY_DSN});

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
