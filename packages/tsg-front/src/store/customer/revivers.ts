import { fromJS, Map } from 'immutable';
import * as moment from 'moment';
import { CustomerRecord } from './types';

export function reviveCustomer(customer: object): CustomerRecord {
  const c = fromJS(customer);

  const lastUpdated = moment(c.get('lastUpdated', 0) as number);
  const createdAt = moment(c.get('createdAt', 0) as number);

  return {
    id: c.get('id') as string,
    firstName: c.get('firstName', '') as string,
    lastName: c.get('lastName', '') as string,
    email: c.get('email', '') as string,
    address: c.get('address', '') as string,
    address2: c.get('address2', '') as string,
    city: c.get('city', '') as string,
    state: c.get('state', '') as string,
    zip: c.get('zip', '') as string,
    homePhone: c.get('homePhone', '') as string,
    cellPhone: c.get('cellPhone', '') as string,
    workPhone: c.get('workPhone', '') as string,
    lastUpdated,
    createdAt,
  };
}

export function reviveCustomerList(customerList: object[]): CustomerRecord[] {
  const clist = fromJS(customerList);

  return clist.map((c: Map<string, string>) => reviveCustomer(c));
}
