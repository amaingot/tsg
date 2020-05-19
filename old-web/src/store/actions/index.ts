import { CustomersActionType } from "./customerActions";
import { JobsActionType } from "./jobActions";
import { DashboardActionType } from "./dashboardActions";
import { EmployeesActionType } from "./employeeActions";
export const LOAD_ALL_DATA = "LOAD_ALL_DATA";

export interface LoadAllDataAction {
  type: typeof LOAD_ALL_DATA;
}

export type AppActions =
  | EmployeesActionType
  | DashboardActionType
  | CustomersActionType
  | JobsActionType
  | LoadAllDataAction;
