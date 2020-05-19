import { JobCountByMonth } from "tsg-shared";
import { Reducer } from "redux";
import {
  DASHBOARD_LOAD_START,
  DASHBOARD_LOAD_FINISHED
} from "../actions/dashboardActions";
import { AppActions } from "../actions";

export interface DashboardState {
  byMonth: JobCountByMonth;
  loading: boolean;
  loaded: boolean;
}

export const DashboardInitialState: DashboardState = {
  byMonth: {},
  loaded: false,
  loading: false
};

const dashboardReducer: Reducer<DashboardState, AppActions> = (
  state = DashboardInitialState,
  action
) => {
  switch (action.type) {
    case DASHBOARD_LOAD_START:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case DASHBOARD_LOAD_FINISHED:
      return {
        byMonth: action.payload.byMonth,
        loaded: true,
        loading: false
      };
    default:
      return state;
  }
};

export default dashboardReducer;
