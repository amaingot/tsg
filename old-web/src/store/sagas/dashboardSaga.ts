import { call, put, takeLatest, select } from "redux-saga/effects";
import { getJobCountByMonth, GetJobCountByMonthResponse } from "../api";
import {
  LOAD_DASHBOARD,
  DASHBOARD_LOAD_START,
  DASHBOARD_LOAD_FINISHED,
  DASHBOARD_LOAD_FAILED,
  DashboardActionType
} from "../actions/dashboardActions";
import { AppState } from "../reducers";

function* fetchCustomers() {
  try {
    const loaded = yield select<(s: AppState) => boolean>(
      s => s.dashboard.loaded
    );

    if (!loaded) {
      yield put<DashboardActionType>({
        type: DASHBOARD_LOAD_START
      });

      const jobCountResponse: GetJobCountByMonthResponse = yield call(
        getJobCountByMonth
      );

      yield put<DashboardActionType>({
        type: DASHBOARD_LOAD_FINISHED,
        payload: jobCountResponse.data.data
      });
    }
  } catch (e) {
    yield put<DashboardActionType>({
      type: DASHBOARD_LOAD_FAILED,
      payload: { error: e.message }
    });
  }
}

function* dashboardSaga() {
  yield takeLatest(LOAD_DASHBOARD, fetchCustomers);
}

export default dashboardSaga;
