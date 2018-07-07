import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';

import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	connectRouter(history)(rootReducer),
	composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App history={history} />
		</Provider>,
		document.getElementById('root-container')
	);
};

render();
