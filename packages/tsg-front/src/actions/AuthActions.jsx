import axios from 'axios';
// import { pushState } from 'react-router-redux';

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const LOGOUT = '@@auth/LOGOUT';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';

export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};

export const login = (username, password) => dispatch => {
	dispatch({ type: LOGIN_REQUEST });

	return axios
		.post('graphql', {
			query: `mutation { tokenAuth(username: "${username}", password: "${password}") { token } }`,
		})
		.then(response => {
			if (response.data.error) {
				dispatch({ type: LOGIN_FAILURE, payload: response.data.error });
			} else {
				dispatch({ type: LOGIN_SUCCESS, payload: response.data.data.tokenAuth });
			}
		})
		.catch(error => {
			dispatch({ type: LOGIN_FAILURE, payload: error.data });
			// dispatch(pushState(null, '/error'));
		});
};
