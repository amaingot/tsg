import { Moment } from 'moment';

export interface CustomerRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  homePhone: string;
  cellPhone: string;
  workPhone: string;
  lastUpdated: Moment;
  createdAt: Moment;
}

export const enum CustomerActionTypes {
  FETCH_CUSTOMERS = '@@customer/FETCH_CUSTOMERS',
  FETCH_CUSTOMERS_START = '@@customer/FETCH_CUSTOMERS_START',
  FETCH_CUSTOMERS_SUCCESS = '@@customer/FETCH_CUSTOMERS_SUCCESS',
  FETCH_CUSTOMERS_FAILURE = '@@customer/FETCH_CUSTOMERS_FAILURE',
}

export interface CustomerState {
  readonly loading: boolean;
  readonly errors?: string;
  readonly customers?: CustomerRecord[];
}
