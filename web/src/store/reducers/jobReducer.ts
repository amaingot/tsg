import { Job } from "tsg-shared";
import { Reducer } from "redux";
import { JOBS_LOAD_START, JOBS_LOAD_FINISHED } from "../actions/jobActions";
import { AppActions } from "../actions";

export interface JobsState {
  list: Array<Job>;
  pending: Array<Job>;
  loading: boolean;
  loaded: boolean;
}

export const JobsInitialState: JobsState = {
  list: [],
  pending: [],
  loaded: false,
  loading: false
};

const jobsReducer: Reducer<JobsState, AppActions> = (
  state = JobsInitialState,
  action
) => {
  switch (action.type) {
    case JOBS_LOAD_START:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case JOBS_LOAD_FINISHED:
      return {
        list: action.payload.all,
        pending: action.payload.pending,
        loaded: true,
        loading: false
      };
    default:
      return state;
  }
};

export default jobsReducer;
