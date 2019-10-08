import * as EntityTypes from "./EntityTypes";

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  cellPhone: string;
  workPhone: string;
}

export interface CreateJobRequest {
  data: EntityTypes.NewJob;
}

export interface CreateJobResponse {
  data: EntityTypes.Job;
}

export interface CreateCustomerRequest {
  data: EntityTypes.NewCustomer;
}

export interface CreateCustomerResponse {
  data: EntityTypes.Customer;
}

export interface ListJobsResponse {
  data: Array<EntityTypes.Job>;
  count: number;
  scannedCount: number;
}

export interface ListCustomersResponse {
  data: Array<EntityTypes.Customer>;
  count: number;
  scannedCount: number;
}
