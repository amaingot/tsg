import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import callGraphQL from '../../utils/callGraphQL';
import { fetchCustomers, fetchCustomersError, fetchCustomersStart, fetchCustomersSuccess } from './actions';
import { generateListCustomersQuery } from './queries';
import { reviveCustomerList } from './revivers';
import { CustomerActionTypes } from './types';

function* handleFetchCustomers(action: ReturnType<typeof fetchCustomers>) {
  try {
    yield put(fetchCustomersStart());

    const query = generateListCustomersQuery();

    const res = yield call(callGraphQL, query);

    if (res.error) {
      yield put(fetchCustomersError(res.error));
    } else if (res.gqlError) {
      yield put(fetchCustomersError(res.gqlError));
    } else {
      // TODO: fix data access
      debugger;
      const customers = yield call(reviveCustomerList, res.data.customers);
      yield put(fetchCustomersSuccess(customers));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchCustomersError(err.stack!));
    } else {
      yield put(fetchCustomersError('An unknown error occured.'));
    }
  }
}

function* watchFetchCustomers() {
  yield takeEvery(CustomerActionTypes.FETCH_CUSTOMERS, handleFetchCustomers);
}

function* authSaga() {
  yield all([fork(watchFetchCustomers)]);
}

export default authSaga;
