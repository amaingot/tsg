import gql from 'graphql-tag';

export const createCustomerMutation = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
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
export const updateCustomerMutation = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
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
export const deleteCustomerMutation = gql`
  mutation DeleteCustomer($input: DeleteCustomerInput!) {
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
export const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput!) {
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
export const updateJobMutation = gql`
  mutation UpdateJob($input: UpdateJobInput!) {
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
export const deleteJobMutation = gql`
  mutation DeleteJob($input: DeleteJobInput!) {
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
export const createEmployeeMutation = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
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
export const updateEmployeeMutation = gql`
  mutation UpdateEmployee($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
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
export const deleteEmployeeMutation = gql`
  mutation DeleteEmployee($input: DeleteEmployeeInput!) {
    deleteEmployee(input: $input) {
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
