import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  fetchCustomers,
  fetchCustomersError,
  fetchCustomersStart,
  fetchCustomersSuccess,
} from 'store/customer/actions';
import { generateListCustomersQuery } from 'store/customer/queries';
import { reviveCustomerList } from 'store/customer/revivers';
import { CustomerActionTypes } from 'store/customer/types';
import callGraphQL from 'utils/callGraphQL';

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

function* customerSaga() {
  yield all([fork(watchFetchCustomers)]);
}

export default customerSaga;
