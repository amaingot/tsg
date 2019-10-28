import { Employee } from "tsg-shared";
import { Reducer } from "redux";
import {
  EMPLOYEES_LOAD_START,
  EMPLOYEES_LOAD_FINISHED
} from "../actions/employeeActions";
import { AppActions } from "../actions";

export interface EmployeesState {
  list: Array<Employee>;
  loading: boolean;
  loaded: boolean;
}

export const EmployeesInitialState: EmployeesState = {
  list: [],
  loaded: false,
  loading: false
};

const employeeReducer: Reducer<EmployeesState, AppActions> = (
  state = EmployeesInitialState,
  action
) => {
  switch (action.type) {
    case EMPLOYEES_LOAD_START:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case EMPLOYEES_LOAD_FINISHED:
      return {
        list: action.payload,
        loaded: true,
        loading: false
      };
    default:
      return state;
  }
};

export default employeeReducer;
