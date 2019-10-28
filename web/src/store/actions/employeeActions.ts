import { Employee } from "tsg-shared";

export const LOAD_EMPLOYEES = "LOAD_EMPLOYEES";
export const EMPLOYEES_LOAD_START = "EMPLOYEES_LOAD_START";
export const EMPLOYEES_LOAD_FINISHED = "EMPLOYEES_LOAD_FINISHED";
export const EMPLOYEES_LOAD_FAILED = "EMPLOYEES_LOAD_FAILED";

interface LoadEmployeesAction {
  type: typeof LOAD_EMPLOYEES;
}

interface EmployeesLoadStartAction {
  type: typeof EMPLOYEES_LOAD_START;
}

interface EmployeesLoadedAction {
  type: typeof EMPLOYEES_LOAD_FINISHED;
  payload: Array<Employee>;
}

interface EmployeesLoadFailedAction {
  type: typeof EMPLOYEES_LOAD_FAILED;
  payload: {
    error: string;
  };
}

export type EmployeesActionType =
  | LoadEmployeesAction
  | EmployeesLoadStartAction
  | EmployeesLoadedAction
  | EmployeesLoadFailedAction;
