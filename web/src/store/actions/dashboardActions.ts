import { JobCountByMonth } from "tsg-shared";

export const LOAD_DASHBOARD = "LOAD_DASHBOARD";
export const DASHBOARD_LOAD_START = "DASHBOARD_LOAD_START";
export const DASHBOARD_LOAD_FINISHED = "DASHBOARD_LOAD_FINISHED";
export const DASHBOARD_LOAD_FAILED = "DASHBOARD_LOAD_FAILED";

interface LoadDashboardAction {
  type: typeof LOAD_DASHBOARD;
}

interface DashboardLoadStartAction {
  type: typeof DASHBOARD_LOAD_START;
}

interface DashboardLoadedAction {
  type: typeof DASHBOARD_LOAD_FINISHED;
  payload: {
    byMonth: JobCountByMonth;
  };
}

interface DashboardLoadFailedAction {
  type: typeof DASHBOARD_LOAD_FAILED;
  payload: {
    error: string;
  };
}

export type DashboardActionType =
  | LoadDashboardAction
  | DashboardLoadStartAction
  | DashboardLoadedAction
  | DashboardLoadFailedAction;
