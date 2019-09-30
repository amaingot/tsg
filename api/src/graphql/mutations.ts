// tslint:disable
// this is an auto generated file. This will be overwritten

export const createCustomer = `mutation CreateCustomer($input: CreateCustomerInput!) {
  createCustomer(input: $input) {
    id
    memNumber
    lastName
    firstName
    middleInitial
    email
    address
    address2
    city
    state
    zip
    homePhone
    cellPhone
    workPhone
    lastUpdated
    createdAt
  }
}
`;
export const updateCustomer = `mutation UpdateCustomer($input: UpdateCustomerInput!) {
  updateCustomer(input: $input) {
    id
    memNumber
    lastName
    firstName
    middleInitial
    email
    address
    address2
    city
    state
    zip
    homePhone
    cellPhone
    workPhone
    lastUpdated
    createdAt
  }
}
`;
export const deleteCustomer = `mutation DeleteCustomer($input: DeleteCustomerInput!) {
  deleteCustomer(input: $input) {
    id
    memNumber
    lastName
    firstName
    middleInitial
    email
    address
    address2
    city
    state
    zip
    homePhone
    cellPhone
    workPhone
    lastUpdated
    createdAt
  }
}
`;
export const createJob = `mutation CreateJob($input: CreateJobInput!) {
  createJob(input: $input) {
    id
    name
    racket
    tension
    gauge
    recieved
    finished
    stringName
    lastUpdated
    createdAt
  }
}
`;
export const updateJob = `mutation UpdateJob($input: UpdateJobInput!) {
  updateJob(input: $input) {
    id
    name
    racket
    tension
    gauge
    recieved
    finished
    stringName
    lastUpdated
    createdAt
  }
}
`;
export const deleteJob = `mutation DeleteJob($input: DeleteJobInput!) {
  deleteJob(input: $input) {
    id
    name
    racket
    tension
    gauge
    recieved
    finished
    stringName
    lastUpdated
    createdAt
  }
}
`;
export const createEmployee = `mutation CreateEmployee($input: CreateEmployeeInput!) {
  createEmployee(input: $input) {
    id
    firstName
    lastName
    email
    owner
  }
}
`;
export const updateEmployee = `mutation UpdateEmployee($input: UpdateEmployeeInput!) {
  updateEmployee(input: $input) {
    id
    firstName
    lastName
    email
    owner
  }
}
`;
export const deleteEmployee = `mutation DeleteEmployee($input: DeleteEmployeeInput!) {
  deleteEmployee(input: $input) {
    id
    firstName
    lastName
    email
    owner
  }
}
`;
