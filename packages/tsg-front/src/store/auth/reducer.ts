import { Reducer } from 'redux';
import { AuthActionTypes, AuthState } from './types';

const initialState: AuthState = {
  user: undefined,
  jwt: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        jwt: action.payload.jwt,
        user: action.payload.user
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return { ...state, loading: false, errors: action.payload };
    }
    case AuthActionTypes.LOGOUT: {
      return { ...state, jwt: undefined, errors: undefined, user: undefined };
    }
    case AuthActionTypes.UPDATE_USER_SUCCESS: {
      return { ...state, user: { ...state.user, ...action.payload } };
    }
    default: {
      return state;
    }
  }
};

export { reducer as AuthReducer };
