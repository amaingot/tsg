import { Customer } from "tsg-shared";
import { Reducer } from "redux";
import {
  CUSTOMERS_LOAD_START,
  CUSTOMERS_LOAD_FINISHED
} from "../actions/customerActions";
import { AppActions } from "../actions";

export interface CustomersState {
  list: Array<Customer>;
  loading: boolean;
  loaded: boolean;
}

export const CustomersInitialState: CustomersState = {
  list: [],
  loaded: false,
  loading: false
};

const customersReducer: Reducer<CustomersState, AppActions> = (
  state = CustomersInitialState,
  action
) => {
  switch (action.type) {
    case CUSTOMERS_LOAD_START:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case CUSTOMERS_LOAD_FINISHED:
      return {
        list: action.payload,
        loaded: true,
        loading: false
      };
    default:
      return state;
  }
};

export default customersReducer;
