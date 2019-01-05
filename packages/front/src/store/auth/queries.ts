import { EditableUserRecord, LoginRequest } from './types';

export function generateLoginQuery(request: LoginRequest): string {
  return `mutation {
    login(
      username: "${request.email}",
      password: "${request.password}")
      {
        token
        user {
          id
          lastLogin
          isSuperuser
          username
          firstName
          lastName
          firstName
          email
          isStaff
          isActive
          dateJoined
        }
    }
  }`;
}

export function generateUpdateUserQuery(request: EditableUserRecord): string {
  return `mutation {
    updateUser(
      firstName: "${request.firstName}",
      lastName: "${request.lastName}",
      email: "${request.email}")
      {
        user {
          firstName
          lastName
          email
      }
    }
  }`;
}
