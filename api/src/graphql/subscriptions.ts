// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = `subscription OnCreateCustomer {
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
export const onUpdateCustomer = `subscription OnUpdateCustomer {
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
export const onDeleteCustomer = `subscription OnDeleteCustomer {
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
export const onCreateJob = `subscription OnCreateJob {
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
export const onUpdateJob = `subscription OnUpdateJob {
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
export const onDeleteJob = `subscription OnDeleteJob {
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
export const onCreateEmployee = `subscription OnCreateEmployee {
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
export const onUpdateEmployee = `subscription OnUpdateEmployee {
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
export const onDeleteEmployee = `subscription OnDeleteEmployee {
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
