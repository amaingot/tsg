import gql from 'graphql-tag';

export const getCustomerQuery = gql`
  query GetCustomer($id: ID!) {
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
export const listCustomersQuery = gql`
  query ListCustomers($filter: ModelCustomerFilterInput, $limit: Int, $nextToken: String) {
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
export const getJobQuery = gql`
  query GetJob($id: ID!) {
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
export const listJobsQuery = gql`
  query ListJobs($filter: ModelJobFilterInput, $limit: Int, $nextToken: String) {
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
export const getEmployeeQuery = gql`
  query GetEmployee($id: ID!) {
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
export const listEmployeesQuery = gql`
  query ListEmployees($filter: ModelEmployeeFilterInput, $limit: Int, $nextToken: String) {
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
export const searchCustomersQuery = gql`
  query SearchCustomers(
    $filter: SearchableCustomerFilterInput
    $sort: SearchableCustomerSortInput
    $limit: Int
    $nextToken: Int
  ) {
    searchCustomers(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
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
export const searchJobsQuery = gql`
  query SearchJobs(
    $filter: SearchableJobFilterInput
    $sort: SearchableJobSortInput
    $limit: Int
    $nextToken: Int
  ) {
    searchJobs(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
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
