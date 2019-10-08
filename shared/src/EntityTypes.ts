import { UserRoles } from "./Constants";

export interface Client {
  id: string;
  name: string;
  phone: string;
  stripeCustomerId: string;
  updatedAt: string;
  createdAt: string;
}

export interface NewJob {
  customerId: string;
  name?: string;
  stringName?: string;
  racket?: string;
  tension?: string;
  gauge?: string;
  finished?: boolean;
  recievedAt?: string;
  finishedAt?: string;
}

export interface Job extends NewJob {
  id: string;
  clientId: string;
  updatedAt: string;
  createdAt: string;
}

export interface NewCustomer {
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
}

export interface Customer extends NewCustomer {
  id: string;
  clientId: string;
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