# Tennis Shop Guru

This repository is a lerna monorepo containing the front end web application and a back end api.

## Data Model

Roughly the data follows this data model:

```
type Customer {
  id: ID!
  clientId: ID!
  memNumber: String
  lastName: String
  firstName: String
  middleInitial: String
  email: String
  address: String
  address2: String
  city: String
  state: String
  zip: String
  homePhone: String
  cellPhone: String
  workPhone: String
  lastUpdated: AWSDateTime
  createdAt: AWSDateTime
  jobs: [Job] @connection(name: "CustomerJobs")
}


type Job {
  id: ID!
  name: String
  racket: String
  tension: String
  gauge: String
  recieved: AWSDateTime
  finished: String
  stringName: String
  lastUpdated: AWSDateTime
  createdAt: AWSDateTime
  customer: Customer @connection(name: "CustomerJobs")
  employee: Employee @connection(name: "EmployeeJobs")
}

type Employee {
  id: ID!
  firstName: String
  lastName: String
  email: AWSEmail
  owner: String!
  jobs: [Job] @connection(name: "EmployeeJobs")
}
```
