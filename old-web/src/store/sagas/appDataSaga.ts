import { put, takeLatest } from "redux-saga/effects";
import { LOAD_JOBS } from "../actions/jobActions";
import { LOAD_ALL_DATA, AppActions } from "../actions";
import { LOAD_CUSTOMERS } from "../actions/customerActions";
import { LOAD_DASHBOARD } from "../actions/dashboardActions";

function* loadAllData() {
  try {
    yield put<AppActions>({
      type: LOAD_JOBS
    });
    yield put<AppActions>({
      type: LOAD_CUSTOMERS
    });
    yield put<AppActions>({
      type: LOAD_DASHBOARD
    });
  } catch (e) {
    window.Rollbar.error(e);
  }
}

function* appDataSaga() {
  yield takeLatest(LOAD_ALL_DATA, loadAllData);
}

export default appDataSaga;
