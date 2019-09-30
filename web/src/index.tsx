import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from '@aws-amplify/core';

import config from './aws-exports';

Amplify.configure(config);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
