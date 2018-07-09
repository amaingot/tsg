import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { AuthReducer } from './auth/reducer';
import AuthSaga from './auth/sagas';
import { AuthState } from './auth/types';

export interface ApplicationState {
  auth: AuthState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<ApplicationState>({
  auth: AuthReducer
});

export function* rootSaga() {
  yield all([fork(AuthSaga)]);
}
