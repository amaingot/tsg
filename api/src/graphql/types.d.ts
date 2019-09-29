/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateCustomerInput = {
  id?: string | null,
  memNumber?: string | null,
  lastName?: string | null,
  firstName?: string | null,
  middleInitial?: string | null,
  email?: string | null,
  address?: string | null,
  address2?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  homePhone?: string | null,
  cellPhone?: string | null,
  workPhone?: string | null,
  lastUpdated?: string | null,
  createdAt?: string | null,
};

export type UpdateCustomerInput = {
  id: string,
  memNumber?: string | null,
  lastName?: string | null,
  firstName?: string | null,
  middleInitial?: string | null,
  email?: string | null,
  address?: string | null,
  address2?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  homePhone?: string | null,
  cellPhone?: string | null,
  workPhone?: string | null,
  lastUpdated?: string | null,
  createdAt?: string | null,
};

export type DeleteCustomerInput = {
  id?: string | null,
};

export type CreateJobInput = {
  id?: string | null,
  name?: string | null,
  racket?: string | null,
  tension?: string | null,
  gauge?: string | null,
  recieved?: string | null,
  finished?: string | null,
  stringName?: string | null,
  lastUpdated?: string | null,
  createdAt?: string | null,
  jobCustomerId?: string | null,
  jobEmployeeId?: string | null,
};

export type UpdateJobInput = {
  id: string,
  name?: string | null,
  racket?: string | null,
  tension?: string | null,
  gauge?: string | null,
  recieved?: string | null,
  finished?: string | null,
  stringName?: string | null,
  lastUpdated?: string | null,
  createdAt?: string | null,
  jobCustomerId?: string | null,
  jobEmployeeId?: string | null,
};

export type DeleteJobInput = {
  id?: string | null,
};

export type CreateEmployeeInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  owner: string,
};

export type UpdateEmployeeInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  owner?: string | null,
};

export type DeleteEmployeeInput = {
  id?: string | null,
};

export type ModelCustomerFilterInput = {
  id?: ModelIDFilterInput | null,
  memNumber?: ModelStringFilterInput | null,
  lastName?: ModelStringFilterInput | null,
  firstName?: ModelStringFilterInput | null,
  middleInitial?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  address?: ModelStringFilterInput | null,
  address2?: ModelStringFilterInput | null,
  city?: ModelStringFilterInput | null,
  state?: ModelStringFilterInput | null,
  zip?: ModelStringFilterInput | null,
  homePhone?: ModelStringFilterInput | null,
  cellPhone?: ModelStringFilterInput | null,
  workPhone?: ModelStringFilterInput | null,
  lastUpdated?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  and?: Array<ModelCustomerFilterInput | null> | null,
  or?: Array<ModelCustomerFilterInput | null> | null,
  not?: ModelCustomerFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array<string | null> | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array<string | null> | null,
  beginsWith?: string | null,
};

export type ModelJobFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  racket?: ModelStringFilterInput | null,
  tension?: ModelStringFilterInput | null,
  gauge?: ModelStringFilterInput | null,
  recieved?: ModelStringFilterInput | null,
  finished?: ModelStringFilterInput | null,
  stringName?: ModelStringFilterInput | null,
  lastUpdated?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  and?: Array<ModelJobFilterInput | null> | null,
  or?: Array<ModelJobFilterInput | null> | null,
  not?: ModelJobFilterInput | null,
};

export type ModelEmployeeFilterInput = {
  id?: ModelIDFilterInput | null,
  firstName?: ModelStringFilterInput | null,
  lastName?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  owner?: ModelStringFilterInput | null,
  and?: Array<ModelEmployeeFilterInput | null> | null,
  or?: Array<ModelEmployeeFilterInput | null> | null,
  not?: ModelEmployeeFilterInput | null,
};

export type SearchableCustomerFilterInput = {
  id?: SearchableIDFilterInput | null,
  memNumber?: SearchableStringFilterInput | null,
  lastName?: SearchableStringFilterInput | null,
  firstName?: SearchableStringFilterInput | null,
  middleInitial?: SearchableStringFilterInput | null,
  email?: SearchableStringFilterInput | null,
  address?: SearchableStringFilterInput | null,
  address2?: SearchableStringFilterInput | null,
  city?: SearchableStringFilterInput | null,
  state?: SearchableStringFilterInput | null,
  zip?: SearchableStringFilterInput | null,
  homePhone?: SearchableStringFilterInput | null,
  cellPhone?: SearchableStringFilterInput | null,
  workPhone?: SearchableStringFilterInput | null,
  lastUpdated?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  and?: Array<SearchableCustomerFilterInput | null> | null,
  or?: Array<SearchableCustomerFilterInput | null> | null,
  not?: SearchableCustomerFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableCustomerSortInput = {
  field?: SearchableCustomerSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableCustomerSortableFields {
  id = "id",
  memNumber = "memNumber",
  lastName = "lastName",
  firstName = "firstName",
  middleInitial = "middleInitial",
  email = "email",
  address = "address",
  address2 = "address2",
  city = "city",
  state = "state",
  zip = "zip",
  homePhone = "homePhone",
  cellPhone = "cellPhone",
  workPhone = "workPhone",
  lastUpdated = "lastUpdated",
  createdAt = "createdAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableJobFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  racket?: SearchableStringFilterInput | null,
  tension?: SearchableStringFilterInput | null,
  gauge?: SearchableStringFilterInput | null,
  recieved?: SearchableStringFilterInput | null,
  finished?: SearchableStringFilterInput | null,
  stringName?: SearchableStringFilterInput | null,
  lastUpdated?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  and?: Array<SearchableJobFilterInput | null> | null,
  or?: Array<SearchableJobFilterInput | null> | null,
  not?: SearchableJobFilterInput | null,
};

export type SearchableJobSortInput = {
  field?: SearchableJobSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableJobSortableFields {
  id = "id",
  name = "name",
  racket = "racket",
  tension = "tension",
  gauge = "gauge",
  recieved = "recieved",
  finished = "finished",
  stringName = "stringName",
  lastUpdated = "lastUpdated",
  createdAt = "createdAt",
}


export type CreateCustomerMutationVariables = {
  input: CreateCustomerInput,
};

export type CreateCustomerMutation = {
  createCustomer: {
    __typename: "Customer",
    id: string,
    memNumber: string | null,
    lastName: string | null,
    firstName: string | null,
    middleInitial: string | null,
    email: string | null,
    address: string | null,
    address2: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    homePhone: string | null,
    cellPhone: string | null,
    workPhone: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateCustomerMutationVariables = {
  input: UpdateCustomerInput,
};

export type UpdateCustomerMutation = {
  updateCustomer: {
    __typename: "Customer",
    id: string,
    memNumber: string | null,
    lastName: string | null,
    firstName: string | null,
    middleInitial: string | null,
    email: string | null,
    address: string | null,
    address2: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    homePhone: string | null,
    cellPhone: string | null,
    workPhone: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteCustomerMutationVariables = {
  input: DeleteCustomerInput,
};

export type DeleteCustomerMutation = {
  deleteCustomer: {
    __typename: "Customer",
    id: string,
    memNumber: string | null,
    lastName: string | null,
    firstName: string | null,
    middleInitial: string | null,
    email: string | null,
    address: string | null,
    address2: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    homePhone: string | null,
    cellPhone: string | null,
    workPhone: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateJobMutationVariables = {
  input: CreateJobInput,
};

export type CreateJobMutation = {
  createJob: {
    __typename: "Job",
    id: string,
    name: string | null,
    racket: string | null,
    tension: string | null,
    gauge: string | null,
    recieved: string | null,
    finished: string | null,
    stringName: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    customer: {
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
    employee: {
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateJobMutationVariables = {
  input: UpdateJobInput,
};

export type UpdateJobMutation = {
  updateJob: {
    __typename: "Job",
    id: string,
    name: string | null,
    racket: string | null,
    tension: string | null,
    gauge: string | null,
    recieved: string | null,
    finished: string | null,
    stringName: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    customer: {
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
    employee: {
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteJobMutationVariables = {
  input: DeleteJobInput,
};

export type DeleteJobMutation = {
  deleteJob: {
    __typename: "Job",
    id: string,
    name: string | null,
    racket: string | null,
    tension: string | null,
    gauge: string | null,
    recieved: string | null,
    finished: string | null,
    stringName: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    customer: {
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
    employee: {
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateEmployeeMutationVariables = {
  input: CreateEmployeeInput,
};

export type CreateEmployeeMutation = {
  createEmployee: {
    __typename: "Employee",
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    owner: string,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateEmployeeMutationVariables = {
  input: UpdateEmployeeInput,
};

export type UpdateEmployeeMutation = {
  updateEmployee: {
    __typename: "Employee",
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    owner: string,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteEmployeeMutationVariables = {
  input: DeleteEmployeeInput,
};

export type DeleteEmployeeMutation = {
  deleteEmployee: {
    __typename: "Employee",
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    owner: string,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetCustomerQueryVariables = {
  id: string,
};

export type GetCustomerQuery = {
  getCustomer: {
    __typename: "Customer",
    id: string,
    memNumber: string | null,
    lastName: string | null,
    firstName: string | null,
    middleInitial: string | null,
    email: string | null,
    address: string | null,
    address2: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    homePhone: string | null,
    cellPhone: string | null,
    workPhone: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListCustomersQueryVariables = {
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCustomersQuery = {
  listCustomers: {
    __typename: "ModelCustomerConnection",
    items: Array<{
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null> | null,
    nextToken: string | null,
  } | null,
};

export type GetJobQueryVariables = {
  id: string,
};

export type GetJobQuery = {
  getJob: {
    __typename: "Job",
    id: string,
    name: string | null,
    racket: string | null,
    tension: string | null,
    gauge: string | null,
    recieved: string | null,
    finished: string | null,
    stringName: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    customer: {
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
    employee: {
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs: {
    __typename: "ModelJobConnection",
    items: Array<{
      __typename: "Job",
      id: string,
      name: string | null,
      racket: string | null,
      tension: string | null,
      gauge: string | null,
      recieved: string | null,
      finished: string | null,
      stringName: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      customer: {
        __typename: "Customer",
        id: string,
        memNumber: string | null,
        lastName: string | null,
        firstName: string | null,
        middleInitial: string | null,
        email: string | null,
        address: string | null,
        address2: string | null,
        city: string | null,
        state: string | null,
        zip: string | null,
        homePhone: string | null,
        cellPhone: string | null,
        workPhone: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null,
      employee: {
        __typename: "Employee",
        id: string,
        firstName: string | null,
        lastName: string | null,
        email: string | null,
        owner: string,
      } | null,
    } | null> | null,
    nextToken: string | null,
  } | null,
};

export type GetEmployeeQueryVariables = {
  id: string,
};

export type GetEmployeeQuery = {
  getEmployee: {
    __typename: "Employee",
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    owner: string,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListEmployeesQueryVariables = {
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmployeesQuery = {
  listEmployees: {
    __typename: "ModelEmployeeConnection",
    items: Array<{
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null> | null,
    nextToken: string | null,
  } | null,
};

export type SearchCustomersQueryVariables = {
  filter?: SearchableCustomerFilterInput | null,
  sort?: SearchableCustomerSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchCustomersQuery = {
  searchCustomers: {
    __typename: "SearchableCustomerConnection",
    items: Array<{
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null> | null,
    nextToken: string | null,
  } | null,
};

export type SearchJobsQueryVariables = {
  filter?: SearchableJobFilterInput | null,
  sort?: SearchableJobSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchJobsQuery = {
  searchJobs: {
    __typename: "SearchableJobConnection",
    items: Array<{
      __typename: "Job",
      id: string,
      name: string | null,
      racket: string | null,
      tension: string | null,
      gauge: string | null,
      recieved: string | null,
      finished: string | null,
      stringName: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      customer: {
        __typename: "Customer",
        id: string,
        memNumber: string | null,
        lastName: string | null,
        firstName: string | null,
        middleInitial: string | null,
        email: string | null,
        address: string | null,
        address2: string | null,
        city: string | null,
        state: string | null,
        zip: string | null,
        homePhone: string | null,
        cellPhone: string | null,
        workPhone: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null,
      employee: {
        __typename: "Employee",
        id: string,
        firstName: string | null,
        lastName: string | null,
        email: string | null,
        owner: string,
      } | null,
    } | null> | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateCustomerSubscription = {
  onCreateCustomer: {
    __typename: "Customer",
    id: string,
    memNumber: string | null,
    lastName: string | null,
    firstName: string | null,
    middleInitial: string | null,
    email: string | null,
    address: string | null,
    address2: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    homePhone: string | null,
    cellPhone: string | null,
    workPhone: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateCustomerSubscription = {
  onUpdateCustomer: {
    __typename: "Customer",
    id: string,
    memNumber: string | null,
    lastName: string | null,
    firstName: string | null,
    middleInitial: string | null,
    email: string | null,
    address: string | null,
    address2: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    homePhone: string | null,
    cellPhone: string | null,
    workPhone: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteCustomerSubscription = {
  onDeleteCustomer: {
    __typename: "Customer",
    id: string,
    memNumber: string | null,
    lastName: string | null,
    firstName: string | null,
    middleInitial: string | null,
    email: string | null,
    address: string | null,
    address2: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    homePhone: string | null,
    cellPhone: string | null,
    workPhone: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateJobSubscription = {
  onCreateJob: {
    __typename: "Job",
    id: string,
    name: string | null,
    racket: string | null,
    tension: string | null,
    gauge: string | null,
    recieved: string | null,
    finished: string | null,
    stringName: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    customer: {
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
    employee: {
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob: {
    __typename: "Job",
    id: string,
    name: string | null,
    racket: string | null,
    tension: string | null,
    gauge: string | null,
    recieved: string | null,
    finished: string | null,
    stringName: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    customer: {
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
    employee: {
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob: {
    __typename: "Job",
    id: string,
    name: string | null,
    racket: string | null,
    tension: string | null,
    gauge: string | null,
    recieved: string | null,
    finished: string | null,
    stringName: string | null,
    lastUpdated: string | null,
    createdAt: string | null,
    customer: {
      __typename: "Customer",
      id: string,
      memNumber: string | null,
      lastName: string | null,
      firstName: string | null,
      middleInitial: string | null,
      email: string | null,
      address: string | null,
      address2: string | null,
      city: string | null,
      state: string | null,
      zip: string | null,
      homePhone: string | null,
      cellPhone: string | null,
      workPhone: string | null,
      lastUpdated: string | null,
      createdAt: string | null,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
    employee: {
      __typename: "Employee",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      owner: string,
      jobs: {
        __typename: "ModelJobConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateEmployeeSubscription = {
  onCreateEmployee: {
    __typename: "Employee",
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    owner: string,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateEmployeeSubscription = {
  onUpdateEmployee: {
    __typename: "Employee",
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    owner: string,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteEmployeeSubscription = {
  onDeleteEmployee: {
    __typename: "Employee",
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    owner: string,
    jobs: {
      __typename: "ModelJobConnection",
      items: Array<{
        __typename: "Job",
        id: string,
        name: string | null,
        racket: string | null,
        tension: string | null,
        gauge: string | null,
        recieved: string | null,
        finished: string | null,
        stringName: string | null,
        lastUpdated: string | null,
        createdAt: string | null,
      } | null> | null,
      nextToken: string | null,
    } | null,
  } | null,
};
