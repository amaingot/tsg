import { call, put, takeLatest, select } from "redux-saga/effects";
import { getAllEmployees, GetAllEmployeesResponse } from "../api";
import {
  LOAD_EMPLOYEES,
  EMPLOYEES_LOAD_START,
  EMPLOYEES_LOAD_FINISHED,
  EMPLOYEES_LOAD_FAILED,
  EmployeesActionType
} from "../actions/employeeActions";
import { AppState } from "../reducers";

function* fetchEmployees() {
  try {
    const loaded = yield select<(s: AppState) => boolean>(
      s => s.employees.loaded
    );

    if (!loaded) {
      yield put<EmployeesActionType>({
        type: EMPLOYEES_LOAD_START
      });

      const employeesResponse: GetAllEmployeesResponse = yield call(
        getAllEmployees
      );

      yield put<EmployeesActionType>({
        type: EMPLOYEES_LOAD_FINISHED,
        payload: employeesResponse.data.data
      });
    }
  } catch (e) {
    yield put<EmployeesActionType>({
      type: EMPLOYEES_LOAD_FAILED,
      payload: { error: e.message }
    });
  }
}

function* employeesSaga() {
  yield takeLatest(LOAD_EMPLOYEES, fetchEmployees);
}

export default employeesSaga;
