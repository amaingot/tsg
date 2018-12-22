import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { ApplicationState } from 'store/index';
import callGraphQL from 'utils/callGraphQL';
import {
  login,
  loginError,
  loginSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from './actions';
import { generateLoginQuery, generateUpdateUserQuery } from './queries';
import { parseJwt, reviveEditableuser, reviveUser } from './revivers';
import { AuthActionTypes } from './types';

function* handleLogin(action: ReturnType<typeof login>) {
  try {
    const query = generateLoginQuery(action.payload);

    const res = yield call(callGraphQL, query);

    if (res.error) {
      yield put(loginError(res.error));
    } else if (res.gqlError) {
      yield put(loginError(res.gqlError));
    } else {
      const decodedJwt = yield call(parseJwt, res.data.login.token);
      const user = yield call(reviveUser, res.data.login.user);
      yield put(loginSuccess(decodedJwt, user));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(loginError(err.stack!));
    } else {
      yield put(loginError('An unknown error occured.'));
    }
  }
}

function* handleUpdateUser(action: ReturnType<typeof updateUser>) {
  try {
    const token = yield select((state: ApplicationState) =>
      state.auth.jwt ? state.auth.jwt.token : ''
    );

    const query = generateUpdateUserQuery(action.payload);
    const res = yield call(callGraphQL, query, token);

    if (res.error) {
      yield put(updateUserError(res.error));
    } else if (res.gqlError) {
      yield put(updateUserError(res.gqlError));
    } else {
      const user = yield call(reviveEditableuser, res.data.login.user);
      yield put(updateUserSuccess(user));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(updateUserError(err.stack!));
    } else {
      yield put(updateUserError('An unknown error occured.'));
    }
  }
}

function* watchLoginStart() {
  yield takeEvery(AuthActionTypes.LOGIN_REQUEST, handleLogin);
}

function* watchUpdateUser() {
  yield takeEvery(AuthActionTypes.UPDATE_USER_REQUEST, handleUpdateUser);
}

function* authSaga() {
  yield all([fork(watchLoginStart), fork(watchUpdateUser)]);
}

export default authSaga;
