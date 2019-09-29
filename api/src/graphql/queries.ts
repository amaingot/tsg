// tslint:disable
// this is an auto generated file. This will be overwritten

export const getCustomer = `query GetCustomer($id: ID!) {
  getCustomer(id: $id) {
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
    jobs {
      items {
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
      nextToken
    }
  }
}
`;
export const listCustomers = `query ListCustomers(
  $filter: ModelCustomerFilterInput
  $limit: Int
  $nextToken: String
) {
  listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      jobs {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getJob = `query GetJob($id: ID!) {
  getJob(id: $id) {
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
    customer {
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
      jobs {
        nextToken
      }
    }
    employee {
      id
      firstName
      lastName
      email
      owner
      jobs {
        nextToken
      }
    }
  }
}
`;
export const listJobs = `query ListJobs($filter: ModelJobFilterInput, $limit: Int, $nextToken: String) {
  listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      customer {
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
      employee {
        id
        firstName
        lastName
        email
        owner
      }
    }
    nextToken
  }
}
`;
export const getEmployee = `query GetEmployee($id: ID!) {
  getEmployee(id: $id) {
    id
    firstName
    lastName
    email
    owner
    jobs {
      items {
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
      nextToken
    }
  }
}
`;
export const listEmployees = `query ListEmployees(
  $filter: ModelEmployeeFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstName
      lastName
      email
      owner
      jobs {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const searchCustomers = `query SearchCustomers(
  $filter: SearchableCustomerFilterInput
  $sort: SearchableCustomerSortInput
  $limit: Int
  $nextToken: String
) {
  searchCustomers(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      jobs {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const searchJobs = `query SearchJobs(
  $filter: SearchableJobFilterInput
  $sort: SearchableJobSortInput
  $limit: Int
  $nextToken: String
) {
  searchJobs(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      customer {
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
      employee {
        id
        firstName
        lastName
        email
        owner
      }
    }
    nextToken
  }
}
`;
