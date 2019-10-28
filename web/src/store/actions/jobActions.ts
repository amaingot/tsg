import { Job } from "tsg-shared";

export const LOAD_JOBS = "LOAD_JOBS";
export const JOBS_LOAD_START = "JOBS_LOAD_START";
export const JOBS_LOAD_FINISHED = "JOBS_LOAD_FINISHED";
export const JOBS_LOAD_FAILED = "JOBS_LOAD_FAILED";

interface LoadJobsAction {
  type: typeof LOAD_JOBS;
}

interface JobsLoadStartAction {
  type: typeof JOBS_LOAD_START;
}

interface JobsLoadedAction {
  type: typeof JOBS_LOAD_FINISHED;
  payload: {
    all: Array<Job>;
    pending: Array<Job>;
  };
}

interface JobsLoadFailedAction {
  type: typeof JOBS_LOAD_FAILED;
  payload: {
    error: string;
  };
}

export type JobsActionType =
  | LoadJobsAction
  | JobsLoadStartAction
  | JobsLoadedAction
  | JobsLoadFailedAction;
