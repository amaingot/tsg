import { call, put, takeLatest, select } from "redux-saga/effects";
import { getAllCustomers, GetAllCustomersResponse } from "../api";
import {
  LOAD_CUSTOMERS,
  CUSTOMERS_LOAD_START,
  CUSTOMERS_LOAD_FINISHED,
  CUSTOMERS_LOAD_FAILED,
  CustomersActionType
} from "../actions/customerActions";
import { AppState } from "../reducers";

function* fetchCustomers() {
  try {
    const loaded = yield select<(s: AppState) => boolean>(
      s => s.customers.loaded
    );

    if (!loaded) {
      yield put<CustomersActionType>({
        type: CUSTOMERS_LOAD_START
      });

      const customersResponse: GetAllCustomersResponse = yield call(
        getAllCustomers
      );

      yield put<CustomersActionType>({
        type: CUSTOMERS_LOAD_FINISHED,
        payload: customersResponse.data.data
      });
    }
  } catch (e) {
    yield put<CustomersActionType>({
      type: CUSTOMERS_LOAD_FAILED,
      payload: { error: e.message }
    });
  }
}

function* customersSaga() {
  yield takeLatest(LOAD_CUSTOMERS, fetchCustomers);
}

export default customersSaga;
