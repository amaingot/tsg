import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { AuthReducer } from 'store/auth/reducer';
import AuthSaga from 'store/auth/sagas';
import { AuthState } from 'store/auth/types';
import { CustomerReducer } from 'store/customer/reducer';
import CustomerSaga from 'store/customer/sagas';
import { CustomerState } from 'store/customer/types';

export interface ApplicationState {
  auth: AuthState;
  cust: CustomerState;
  router: RouterState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    auth: AuthReducer,
    cust: CustomerReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(AuthSaga), fork(CustomerSaga)]);
}
