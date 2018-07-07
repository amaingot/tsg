import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const history = createBrowserHistory();

const store = createStore(
	connectRouter(history)(rootReducer), // new root reducer with router state
	{},
	compose(
		applyMiddleware(
			routerMiddleware(history) // for dispatching history actions
			// ... other middlewares ...
		)
	)
);

export default { store, history };
