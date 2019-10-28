import { Customer } from "tsg-shared";

export const LOAD_CUSTOMERS = "LOAD_CUSTOMERS";
export const CUSTOMERS_LOAD_START = "CUSTOMERS_LOAD_START";
export const CUSTOMERS_LOAD_FINISHED = "CUSTOMERS_LOAD_FINISHED";
export const CUSTOMERS_LOAD_FAILED = "CUSTOMERS_LOAD_FAILED";

interface LoadCustomersAction {
  type: typeof LOAD_CUSTOMERS;
}

interface CustomersLoadStartAction {
  type: typeof CUSTOMERS_LOAD_START;
}

interface CustomersLoadedAction {
  type: typeof CUSTOMERS_LOAD_FINISHED;
  payload: Array<Customer>;
}

interface CustomersLoadFailedAction {
  type: typeof CUSTOMERS_LOAD_FAILED;
  payload: {
    error: string;
  };
}

export type CustomersActionType =
  | LoadCustomersAction
  | CustomersLoadStartAction
  | CustomersLoadedAction
  | CustomersLoadFailedAction;
