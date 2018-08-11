import { action } from 'typesafe-actions';
import { CustomerActionTypes, CustomerRecord } from './types';

export const fetchCustomers = () => action(CustomerActionTypes.FETCH_CUSTOMERS);

export const fetchCustomersStart = () => action(CustomerActionTypes.FETCH_CUSTOMERS_START);

export const fetchCustomersSuccess = (customers: CustomerRecord[]) =>
  action(CustomerActionTypes.FETCH_CUSTOMERS_SUCCESS, customers);

export const fetchCustomersError = (message: string) =>
  action(CustomerActionTypes.FETCH_CUSTOMERS_FAILURE, message);
