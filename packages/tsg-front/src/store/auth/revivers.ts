import { Map } from 'immutable';
import * as decodeJwt from 'jwt-decode';
import * as moment from 'moment';
import { EditableUserRecord, JWT, UserRecord } from './types';

export function parseJwt(token: string): JWT {
  const decoded = decodeJwt(token);
  const parsed = Map(decoded);

  const expiresNum = parsed.get('exp', '') as number;
  const expiresDate = moment(expiresNum * 1000);

  const issuedNum = parsed.get('orig_iat', '') as number;
  const issuedDate = moment(issuedNum * 1000);

  const jwt = {
    token,
    expiresAt: expiresDate,
    issuedAt: issuedDate,
  };

  return jwt;
}

export function reviveEditableuser(user: object): EditableUserRecord {
  const u = Map(user);
  return {
    firstName: u.get('firstName', '') as string,
    lastName: u.get('lastName', '') as string,
    email: u.get('email', '') as string,
  };
}

export function reviveUser(user: object): UserRecord {
  const u = Map(user);

  const lastLogin = moment(u.get('lastLogin', 0) as number);
  const dateJoined = moment(u.get('dateJoined', 0) as number);

  return {
    id: u.get('id', -1) as number,
    username: u.get('username', '') as string,

    ...reviveEditableuser(user),

    isSuperuser: u.get('isSuperuser', false) as boolean,
    isStaff: u.get('isStaff', false) as boolean,
    isActive: u.get('isActive', false) as boolean,

    lastLogin,
    dateJoined,
  };
}
