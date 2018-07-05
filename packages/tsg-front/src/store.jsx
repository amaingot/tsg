import storage from 'redux-persist/es/storage';
import { applyMiddleware, createStore } from 'redux';
import { createFilter } from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export default history => {
	const persistedFilter = createFilter('auth', ['access', 'refresh']);
	const reducer = persistReducer(
		{
			key: 'polls',
			storage: storage,
			whitelist: ['auth'],
			transforms: [persistedFilter],
		},
		rootReducer
	);
	const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(routerMiddleware(history))));
	persistStore(store);
	return store;
};
