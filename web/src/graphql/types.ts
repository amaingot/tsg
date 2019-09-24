export interface Job {
  __typename: 'Job';
  id: string;
  name: string | null;
  racket: string | null;
  tension: string | null;
  gauge: string | null;
  recieved: string | null;
  finished: string | null;
  stringName: string | null;
  lastUpdated: string | null;
  createdAt: string | null;
}

export interface Customer {
  __typename: 'Customer';
  id: string;
  memNumber: string | null;
  lastName: string | null;
  firstName: string | null;
  middleInitial: string | null;
  email: string | null;
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  homePhone: string | null;
  cellPhone: string | null;
  workPhone: string | null;
  lastUpdated: string | null;
  createdAt: string | null;
}

export interface Employee {
  __typename: 'Employee';
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  owner: string;
}

export interface CreateCustomerInput {
  id?: string | null;
  memNumber?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  middleInitial?: string | null;
  email?: string | null;
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  homePhone?: string | null;
  cellPhone?: string | null;
  workPhone?: string | null;
  lastUpdated?: string | null;
  createdAt?: string | null;
}

export interface UpdateCustomerInput {
  id: string;
  memNumber?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  middleInitial?: string | null;
  email?: string | null;
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  homePhone?: string | null;
  cellPhone?: string | null;
  workPhone?: string | null;
  lastUpdated?: string | null;
  createdAt?: string | null;
}

export interface DeleteCustomerInput {
  id?: string | null;
}

export interface CreateJobInput {
  id?: string | null;
  name?: string | null;
  racket?: string | null;
  tension?: string | null;
  gauge?: string | null;
  recieved?: string | null;
  finished?: string | null;
  stringName?: string | null;
  lastUpdated?: string | null;
  createdAt?: string | null;
  jobCustomerId?: string | null;
  jobEmployeeId?: string | null;
}

export interface UpdateJobInput {
  id: string;
  name?: string | null;
  racket?: string | null;
  tension?: string | null;
  gauge?: string | null;
  recieved?: string | null;
  finished?: string | null;
  stringName?: string | null;
  lastUpdated?: string | null;
  createdAt?: string | null;
  jobCustomerId?: string | null;
  jobEmployeeId?: string | null;
}

export interface DeleteJobInput {
  id?: string | null;
}

export interface CreateEmployeeInput {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  owner: string;
}

export interface UpdateEmployeeInput {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  owner?: string | null;
}

export interface DeleteEmployeeInput {
  id?: string | null;
}

export interface ModelCustomerFilterInput {
  id?: ModelIDFilterInput | null;
  memNumber?: ModelStringFilterInput | null;
  lastName?: ModelStringFilterInput | null;
  firstName?: ModelStringFilterInput | null;
  middleInitial?: ModelStringFilterInput | null;
  email?: ModelStringFilterInput | null;
  address?: ModelStringFilterInput | null;
  address2?: ModelStringFilterInput | null;
  city?: ModelStringFilterInput | null;
  state?: ModelStringFilterInput | null;
  zip?: ModelStringFilterInput | null;
  homePhone?: ModelStringFilterInput | null;
  cellPhone?: ModelStringFilterInput | null;
  workPhone?: ModelStringFilterInput | null;
  lastUpdated?: ModelStringFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  and?: Array<ModelCustomerFilterInput | null> | null;
  or?: Array<ModelCustomerFilterInput | null> | null;
  not?: ModelCustomerFilterInput | null;
}

export interface ModelIDFilterInput {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
}

export interface ModelStringFilterInput {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
}

export interface ModelJobFilterInput {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  racket?: ModelStringFilterInput | null;
  tension?: ModelStringFilterInput | null;
  gauge?: ModelStringFilterInput | null;
  recieved?: ModelStringFilterInput | null;
  finished?: ModelStringFilterInput | null;
  stringName?: ModelStringFilterInput | null;
  lastUpdated?: ModelStringFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  and?: Array<ModelJobFilterInput | null> | null;
  or?: Array<ModelJobFilterInput | null> | null;
  not?: ModelJobFilterInput | null;
}

export interface ModelEmployeeFilterInput {
  id?: ModelIDFilterInput | null;
  firstName?: ModelStringFilterInput | null;
  lastName?: ModelStringFilterInput | null;
  email?: ModelStringFilterInput | null;
  owner?: ModelStringFilterInput | null;
  and?: Array<ModelEmployeeFilterInput | null> | null;
  or?: Array<ModelEmployeeFilterInput | null> | null;
  not?: ModelEmployeeFilterInput | null;
}

export interface SearchableCustomerFilterInput {
  id?: SearchableIDFilterInput | null;
  memNumber?: SearchableStringFilterInput | null;
  lastName?: SearchableStringFilterInput | null;
  firstName?: SearchableStringFilterInput | null;
  middleInitial?: SearchableStringFilterInput | null;
  email?: SearchableStringFilterInput | null;
  address?: SearchableStringFilterInput | null;
  address2?: SearchableStringFilterInput | null;
  city?: SearchableStringFilterInput | null;
  state?: SearchableStringFilterInput | null;
  zip?: SearchableStringFilterInput | null;
  homePhone?: SearchableStringFilterInput | null;
  cellPhone?: SearchableStringFilterInput | null;
  workPhone?: SearchableStringFilterInput | null;
  lastUpdated?: SearchableStringFilterInput | null;
  createdAt?: SearchableStringFilterInput | null;
  and?: Array<SearchableCustomerFilterInput | null> | null;
  or?: Array<SearchableCustomerFilterInput | null> | null;
  not?: SearchableCustomerFilterInput | null;
}

export interface SearchableIDFilterInput {
  ne?: string | null;
  eq?: string | null;
  match?: string | null;
  matchPhrase?: string | null;
  matchPhrasePrefix?: string | null;
  multiMatch?: string | null;
  exists?: boolean | null;
  wildcard?: string | null;
  regexp?: string | null;
}

export interface SearchableStringFilterInput {
  ne?: string | null;
  eq?: string | null;
  match?: string | null;
  matchPhrase?: string | null;
  matchPhrasePrefix?: string | null;
  multiMatch?: string | null;
  exists?: boolean | null;
  wildcard?: string | null;
  regexp?: string | null;
}

export interface SearchableCustomerSortInput {
  field?: SearchableCustomerSortableFields | null;
  direction?: SearchableSortDirection | null;
}

export enum SearchableCustomerSortableFields {
  id = 'id',
  memNumber = 'memNumber',
  lastName = 'lastName',
  firstName = 'firstName',
  middleInitial = 'middleInitial',
  email = 'email',
  address = 'address',
  address2 = 'address2',
  city = 'city',
  state = 'state',
  zip = 'zip',
  homePhone = 'homePhone',
  cellPhone = 'cellPhone',
  workPhone = 'workPhone',
  lastUpdated = 'lastUpdated',
  createdAt = 'createdAt',
}

export enum SearchableSortDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface SearchableJobFilterInput {
  id?: SearchableIDFilterInput | null;
  name?: SearchableStringFilterInput | null;
  racket?: SearchableStringFilterInput | null;
  tension?: SearchableStringFilterInput | null;
  gauge?: SearchableStringFilterInput | null;
  recieved?: SearchableStringFilterInput | null;
  finished?: SearchableStringFilterInput | null;
  stringName?: SearchableStringFilterInput | null;
  lastUpdated?: SearchableStringFilterInput | null;
  createdAt?: SearchableStringFilterInput | null;
  and?: Array<SearchableJobFilterInput | null> | null;
  or?: Array<SearchableJobFilterInput | null> | null;
  not?: SearchableJobFilterInput | null;
}

export interface SearchableJobSortInput {
  field?: SearchableJobSortableFields | null;
  direction?: SearchableSortDirection | null;
}

export enum SearchableJobSortableFields {
  id = 'id',
  name = 'name',
  racket = 'racket',
  tension = 'tension',
  gauge = 'gauge',
  recieved = 'recieved',
  finished = 'finished',
  stringName = 'stringName',
  lastUpdated = 'lastUpdated',
  createdAt = 'createdAt',
}

export interface CreateCustomerMutationVariables {
  input: CreateCustomerInput;
}

export interface CreateCustomerMutation {
  createCustomer: {
    __typename: 'Customer';
    id: string;
    memNumber: string | null;
    lastName: string | null;
    firstName: string | null;
    middleInitial: string | null;
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    homePhone: string | null;
    cellPhone: string | null;
    workPhone: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface UpdateCustomerMutationVariables {
  input: UpdateCustomerInput;
}

export interface UpdateCustomerMutation {
  updateCustomer: {
    __typename: 'Customer';
    id: string;
    memNumber: string | null;
    lastName: string | null;
    firstName: string | null;
    middleInitial: string | null;
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    homePhone: string | null;
    cellPhone: string | null;
    workPhone: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface DeleteCustomerMutationVariables {
  input: DeleteCustomerInput;
}

export interface DeleteCustomerMutation {
  deleteCustomer: {
    __typename: 'Customer';
    id: string;
    memNumber: string | null;
    lastName: string | null;
    firstName: string | null;
    middleInitial: string | null;
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    homePhone: string | null;
    cellPhone: string | null;
    workPhone: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface CreateJobMutationVariables {
  input: CreateJobInput;
}

export interface CreateJobMutation {
  createJob: {
    __typename: 'Job';
    id: string;
    name: string | null;
    racket: string | null;
    tension: string | null;
    gauge: string | null;
    recieved: string | null;
    finished: string | null;
    stringName: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    customer: {
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
    employee: {
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
}

export interface UpdateJobMutationVariables {
  input: UpdateJobInput;
}

export interface UpdateJobMutation {
  updateJob: {
    __typename: 'Job';
    id: string;
    name: string | null;
    racket: string | null;
    tension: string | null;
    gauge: string | null;
    recieved: string | null;
    finished: string | null;
    stringName: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    customer: {
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
    employee: {
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
}

export interface DeleteJobMutationVariables {
  input: DeleteJobInput;
}

export interface DeleteJobMutation {
  deleteJob: {
    __typename: 'Job';
    id: string;
    name: string | null;
    racket: string | null;
    tension: string | null;
    gauge: string | null;
    recieved: string | null;
    finished: string | null;
    stringName: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    customer: {
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
    employee: {
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
}

export interface CreateEmployeeMutationVariables {
  input: CreateEmployeeInput;
}

export interface CreateEmployeeMutation {
  createEmployee: {
    __typename: 'Employee';
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    owner: string;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface UpdateEmployeeMutationVariables {
  input: UpdateEmployeeInput;
}

export interface UpdateEmployeeMutation {
  updateEmployee: {
    __typename: 'Employee';
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    owner: string;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface DeleteEmployeeMutationVariables {
  input: DeleteEmployeeInput;
}

export interface DeleteEmployeeMutation {
  deleteEmployee: {
    __typename: 'Employee';
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    owner: string;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface GetCustomerQueryVariables {
  id: string;
}

export interface GetCustomerQueryData {
  getCustomer: {
    __typename: 'Customer';
    id: string;
    memNumber: string | null;
    lastName: string | null;
    firstName: string | null;
    middleInitial: string | null;
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    homePhone: string | null;
    cellPhone: string | null;
    workPhone: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface ListCustomersQueryVariables {
  filter?: ModelCustomerFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
}

export interface ListCustomersQueryData {
  listCustomers: {
    __typename: 'ModelCustomerConnection';
    items: Array<{
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
}

export interface GetJobQueryVariables {
  id: string;
}

export interface GetJobQueryData {
  getJob: {
    __typename: 'Job';
    id: string;
    name: string | null;
    racket: string | null;
    tension: string | null;
    gauge: string | null;
    recieved: string | null;
    finished: string | null;
    stringName: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    customer: {
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
    employee: {
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
}

export interface ListJobsQueryVariables {
  filter?: ModelJobFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
}

export interface ListJobsQueryData {
  listJobs: {
    __typename: 'ModelJobConnection';
    items: Array<{
      __typename: 'Job';
      id: string;
      name: string | null;
      racket: string | null;
      tension: string | null;
      gauge: string | null;
      recieved: string | null;
      finished: string | null;
      stringName: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      customer: Customer | null;
      employee: Employee | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
}

export interface GetEmployeeQueryVariables {
  id: string;
}

export interface GetEmployeeQueryData {
  getEmployee: {
    __typename: 'Employee';
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    owner: string;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface ListEmployeesQueryVariables {
  filter?: ModelEmployeeFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
}

export interface ListEmployeesQueryData {
  listEmployees: {
    __typename: 'ModelEmployeeConnection';
    items: Array<{
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
}

export interface SearchCustomersQueryVariables {
  filter?: SearchableCustomerFilterInput | null;
  sort?: SearchableCustomerSortInput | null;
  limit?: number | null;
  nextToken?: number | null;
}

export interface SearchCustomersQueryData {
  searchCustomers: {
    __typename: 'SearchableCustomerConnection';
    items: Array<{
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
}

export interface SearchJobsQueryVariables {
  filter?: SearchableJobFilterInput | null;
  sort?: SearchableJobSortInput | null;
  limit?: number | null;
  nextToken?: number | null;
}

export interface SearchJobsQueryData {
  searchJobs: {
    __typename: 'SearchableJobConnection';
    items: Array<{
      __typename: 'Job';
      id: string;
      name: string | null;
      racket: string | null;
      tension: string | null;
      gauge: string | null;
      recieved: string | null;
      finished: string | null;
      stringName: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      customer: Customer | null;
      employee: Employee | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
}

export interface OnCreateCustomerSubscription {
  onCreateCustomer: {
    __typename: 'Customer';
    id: string;
    memNumber: string | null;
    lastName: string | null;
    firstName: string | null;
    middleInitial: string | null;
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    homePhone: string | null;
    cellPhone: string | null;
    workPhone: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface OnUpdateCustomerSubscription {
  onUpdateCustomer: {
    __typename: 'Customer';
    id: string;
    memNumber: string | null;
    lastName: string | null;
    firstName: string | null;
    middleInitial: string | null;
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    homePhone: string | null;
    cellPhone: string | null;
    workPhone: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface OnDeleteCustomerSubscription {
  onDeleteCustomer: {
    __typename: 'Customer';
    id: string;
    memNumber: string | null;
    lastName: string | null;
    firstName: string | null;
    middleInitial: string | null;
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    homePhone: string | null;
    cellPhone: string | null;
    workPhone: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface OnCreateJobSubscription {
  onCreateJob: {
    __typename: 'Job';
    id: string;
    name: string | null;
    racket: string | null;
    tension: string | null;
    gauge: string | null;
    recieved: string | null;
    finished: string | null;
    stringName: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    customer: {
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
    employee: {
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
}

export interface OnUpdateJobSubscription {
  onUpdateJob: {
    __typename: 'Job';
    id: string;
    name: string | null;
    racket: string | null;
    tension: string | null;
    gauge: string | null;
    recieved: string | null;
    finished: string | null;
    stringName: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    customer: {
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
    employee: {
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
}

export interface OnDeleteJobSubscription {
  onDeleteJob: {
    __typename: 'Job';
    id: string;
    name: string | null;
    racket: string | null;
    tension: string | null;
    gauge: string | null;
    recieved: string | null;
    finished: string | null;
    stringName: string | null;
    lastUpdated: string | null;
    createdAt: string | null;
    customer: {
      __typename: 'Customer';
      id: string;
      memNumber: string | null;
      lastName: string | null;
      firstName: string | null;
      middleInitial: string | null;
      email: string | null;
      address: string | null;
      address2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      homePhone: string | null;
      cellPhone: string | null;
      workPhone: string | null;
      lastUpdated: string | null;
      createdAt: string | null;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
    employee: {
      __typename: 'Employee';
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      owner: string;
      jobs: {
        __typename: 'ModelJobConnection';
        nextToken: string | null;
      } | null;
    } | null;
  } | null;
}

export interface OnCreateEmployeeSubscription {
  onCreateEmployee: {
    __typename: 'Employee';
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    owner: string;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface OnUpdateEmployeeSubscription {
  onUpdateEmployee: {
    __typename: 'Employee';
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    owner: string;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}

export interface OnDeleteEmployeeSubscription {
  onDeleteEmployee: {
    __typename: 'Employee';
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    owner: string;
    jobs: {
      __typename: 'ModelJobConnection';
      items: Array<Job | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
}
