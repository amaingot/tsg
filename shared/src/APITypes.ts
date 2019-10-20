import * as EntityTypes from "./EntityTypes";

type Request<T> = {
  data: T;
};
type SingleResponse<T> = {
  data: T;
  error?: string;
};
type ListResponse<T> = {
  data: Array<T>;
  error?: string;
  count: number;
};

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  cellPhone: string;
  workPhone: string;
}

// Jobs
export type CreateJobRequest = Request<EntityTypes.NewJob>;
export type CreateJobResponse = SingleResponse<EntityTypes.Job>;
export type UpdateJobRequest = Request<EntityTypes.NewJob>;
export type UpdateJobResponse = SingleResponse<EntityTypes.Job>;
export type GetJobResponse = SingleResponse<EntityTypes.Job>;
export type ListJobsResponse = ListResponse<EntityTypes.Job>;

// Customers
export type CreateCustomerRequest = Request<EntityTypes.NewCustomer>;
export type CreateCustomerResponse = SingleResponse<EntityTypes.Customer>;
export type UpdateCustomerRequest = Request<EntityTypes.NewCustomer>;
export type UpdateCustomerResponse = SingleResponse<EntityTypes.Customer>;
export type GetCustomerResponse = SingleResponse<{
  customer: EntityTypes.Customer;
  jobs: Array<EntityTypes.Job>;
}>;
export type ListCustomersResponse = ListResponse<EntityTypes.Customer>;

// Customers
export type CreateEmployeeRequest = Request<EntityTypes.NewEmployee>;
export type UpdateEmployeeRequest = Request<EntityTypes.NewEmployee>;
export type CreateEmployeeResponse = SingleResponse<EntityTypes.Employee>;
export type GetEmployeeResponse = SingleResponse<EntityTypes.Employee>;
export type ListEmployeesResponse = ListResponse<EntityTypes.Employee>;

// Clients
export interface GetMeResponse {
  data: {
    client: EntityTypes.Client;
    user: EntityTypes.Employee;
  };
}
