import { Moment } from 'moment';

export interface EditableUserRecord {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserRecord extends EditableUserRecord {
  id: number;
  email: string;

  isSuperuser: boolean;
  isStaff: boolean;
  isActive: boolean;

  lastLogin: Moment;
  dateJoined: Moment;
}

export interface JWT {
  token: string;
  expiresAt: Moment;
  issuedAt: Moment;
}

export interface LoginRequest {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}

export const enum AuthActionTypes {
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED',
  LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',
  TOKEN_FAILURE = '@@auth/TOKEN_FAILURE',
  UPDATE_USER_REQUEST = '@@auth/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@@auth/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@@auth/UPDATE_USER_FAILURE',
  LOGOUT = '@@auth/LOGOUT',
}

export interface AuthState {
  readonly loading: boolean;
  readonly user?: UserRecord;
  readonly jwt?: JWT;
  readonly errors?: string;
}
