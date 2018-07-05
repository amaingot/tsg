import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';
import * as AuthActions from '../actions/AuthActions';

/**
|--------------------------------------------------
| Record
|--------------------------------------------------
*/
export class AuthRecord extends Immutable.Record({
	token: '',
	username: undefined,
	expires: undefined,
	issued: undefined,
	errors: undefined,
}) {}

/**
|--------------------------------------------------
| Reviver
|--------------------------------------------------
*/
export function reviveAuthRecord(token) {
	const record = new AuthRecord({ token });
	const decoded = Immutable.Map(jwtDecode(token));

	return record
		.set('username', decoded.get('username'))
		.set('expires', decoded.get('exp'))
		.set('expires', decoded.get('orig_iat'))
		.set('errors', undefined);
}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export default (state = new AuthRecord(), action) => {
	switch (action.type) {
		case AuthActions.LOGIN_SUCCESS:
		case AuthActions.TOKEN_RECEIVED:
			return reviveAuthRecord(action.payload.token);

		case AuthActions.LOGIN_FAILURE:
		case AuthActions.TOKEN_FAILURE:
			return state
				.set('token', '')
				.set('decodedToken', undefined)
				.set('errors', action.payload);

		case AuthActions.LOGOUT:
			return new AuthRecord();

		default:
			return state;
	}
};

/**
|--------------------------------------------------
| Helpers
|--------------------------------------------------
*/
export function accessToken(state) {
	state.get('token', undefined);
}

export function isAccessTokenExpired(state) {
	const exp = state.get('expires', 0);

	return 1000 * exp - new Date().getTime() < 5000;
}

export function isAuthenticated(state) {
	return !isAccessTokenExpired(state);
}

export function errors(state) {
	return state.get('errors', undefined);
}
