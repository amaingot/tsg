import { combineReducers } from "redux";

import { AppActions } from "../actions";
import jobs, { JobsState, JobsInitialState } from "./jobReducer";
import customers, {
  CustomersState,
  CustomersInitialState
} from "./customerReducer";
import dashboard, {
  DashboardInitialState,
  DashboardState
} from "./dashboardReducer";

import employees, {
  EmployeesInitialState,
  EmployeesState
} from "./employeeReducer";

export interface AppState {
  jobs: JobsState;
  customers: CustomersState;
  dashboard: DashboardState;
  employees: EmployeesState;
}

export const InitialState: AppState = {
  jobs: JobsInitialState,
  customers: CustomersInitialState,
  dashboard: DashboardInitialState,
  employees: EmployeesInitialState
};

const reducers = combineReducers<AppState, AppActions>({
  jobs,
  customers,
  dashboard,
  employees
});

export default reducers;
