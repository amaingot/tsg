import { action } from 'typesafe-actions';

import {
  AuthActionTypes,
  EditableUserRecord,
  JWT,
  LoginRequest,
  UserRecord,
} from 'store/auth/types';

export const login = (request: LoginRequest) => action(AuthActionTypes.LOGIN_REQUEST, request);

export const logout = () => action(AuthActionTypes.LOGOUT);

export const loginSuccess = (jwt: JWT, user: UserRecord) =>
  action(AuthActionTypes.LOGIN_SUCCESS, { jwt, user });

export const loginError = (message: string) => action(AuthActionTypes.LOGIN_FAILURE, message);

export const updateUser = (newUser: EditableUserRecord) =>
  action(AuthActionTypes.UPDATE_USER_REQUEST, newUser);

export const updateUserSuccess = (updatedUser: EditableUserRecord) =>
  action(AuthActionTypes.UPDATE_USER_SUCCESS, updatedUser);

export const updateUserError = (message: string) =>
  action(AuthActionTypes.UPDATE_USER_FAILURE, message);
