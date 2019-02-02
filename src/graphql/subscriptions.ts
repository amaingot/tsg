import gql from 'graphql-tag';

export const onCreateCustomerSubscription = gql`
  subscription OnCreateCustomer {
    onCreateCustomer {
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
export const onUpdateCustomerSubscription = gql`
  subscription OnUpdateCustomer {
    onUpdateCustomer {
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
export const onDeleteCustomerSubscription = gql`
  subscription OnDeleteCustomer {
    onDeleteCustomer {
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
export const onCreateJobSubscription = gql`
  subscription OnCreateJob {
    onCreateJob {
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
export const onUpdateJobSubscription = gql`
  subscription OnUpdateJob {
    onUpdateJob {
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
export const onDeleteJobSubscription = gql`
  subscription OnDeleteJob {
    onDeleteJob {
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
export const onCreateEmployeeSubscription = gql`
  subscription OnCreateEmployee {
    onCreateEmployee {
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
export const onUpdateEmployeeSubscription = gql`
  subscription OnUpdateEmployee {
    onUpdateEmployee {
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
export const onDeleteEmployeeSubscription = gql`
  subscription OnDeleteEmployee {
    onDeleteEmployee {
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
