export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  cellPhone: string;
  workPhone: string;
}

export enum UserRoles {
  SuperAdmin = "SuperAdmin",
  AccountAdmin = "AccountAdmin",
  Employee = "Employee"
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  stripeCustomerId: string;
  updatedAt: string;
  createdAt: string;
}

export interface Job {
  id: string;
  clientId: string;
  customerId: string;
  name: string;
  stringName: string;
  racket: string;
  tension: string;
  gauge: string;
  recievedAt: string;
  finishedAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  clientId: string;
  memNumber?: string;
  lastName?: string;
  firstName?: string;
  middleInitial?: string;
  email?: string;
  address?: string;
  address2?: string;
  city?: string;
  zip?: string;
  homePhone?: string;
  cellPhone?: string;
  workPhone?: string;
  updatedAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  userRole: UserRoles;
  updatedAt: string;
  createdAt: string;
}
