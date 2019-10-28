import { call, put, takeLatest, select } from "redux-saga/effects";
import { getAllJobs, GetAllJobsResponse, getPendingJobs } from "../api";
import {
  LOAD_JOBS,
  JOBS_LOAD_START,
  JOBS_LOAD_FINISHED,
  JOBS_LOAD_FAILED,
  JobsActionType
} from "../actions/jobActions";
import { AppState } from "../reducers";

function* fetchAllJobs() {
  try {
    const loaded = yield select<(s: AppState) => boolean>(s => s.jobs.loaded);

    if (!loaded) {
      yield put<JobsActionType>({
        type: JOBS_LOAD_START
      });

      const allJobsResponse: GetAllJobsResponse = yield call(getAllJobs);

      const pendingJobsResponse: GetAllJobsResponse = yield call(
        getPendingJobs
      );

      yield put<JobsActionType>({
        type: JOBS_LOAD_FINISHED,
        payload: {
          all: allJobsResponse.data.data,
          pending: pendingJobsResponse.data.data
        }
      });
    }
  } catch (e) {
    yield put<JobsActionType>({
      type: JOBS_LOAD_FAILED,
      payload: { error: e.message }
    });
  }
}

function* jobsSaga() {
  yield takeLatest(LOAD_JOBS, fetchAllJobs);
}

export default jobsSaga;
