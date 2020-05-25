import { gql } from "apollo-server-express";
const schema = gql`
  "Date time represented as an ISO String"
  scalar DateTime

  scalar Email

  type StripeProduct {
    id: ID!
    active: Boolean!
    created: DateTime!
    description: String
    images: [String!]!
    livemode: Boolean!
    name: String!
    statementDescriptor: String
    type: String
    unitLabel: String
    updated: DateTime!
  }

  type StripePlan {
    id: ID!
    active: Boolean!
    amount: Int!
    amountDecimal: String!
    billingScheme: String!
    created: DateTime!
    currency: String!
    interval: String!
    intervalCount: Int!
    livemode: Boolean!
    nickname: String
    productId: ID
    product: StripeProduct
    trialPeriodDays: Int
    usageType: String!
    features: [String!]!
    description: String!
  }

  enum UserRole {
    SuperAdmin
    AccountAdmin
    Employee
  }

  type Client {
    id: ID!
    name: String!
    stripeCustomerId: String!
    updatedAt: DateTime!
    createdAt: DateTime!

    employees(input: PaginationInput): Employees!
    clients(input: PaginationInput): Clients!
    jobs(input: PaginationInput): Jobs!
    customers(input: PaginationInput): Customers!
  }

  type Customer {
    id: ID!
    clientId: ID!
    memNum: String
    firstName: String
    lastName: String
    middleInitial: String
    email: Email
    address: String
    address2: String
    city: String
    zip: String
    homePhone: String
    cellPhone: String
    workPhone: String
    updatedAt: DateTime!
    createdAt: DateTime!

    client: Client!
    jobs(input: PaginationInput): Jobs!
  }

  type Job {
    id: ID!
    customerId: String!
    clientId: ID!
    finished: Boolean!
    updatedAt: DateTime!
    createdAt: DateTime!
    name: String
    stringName: String
    racket: String
    tension: String
    gauge: String
    recievedAt: DateTime
    finishedAt: DateTime
    finishedByEmployeeId: ID

    finishedByEmployee: Employee
    customer: Customer!
    client: Client!
  }

  type Employee {
    id: ID!
    clientId: ID!
    firstName: String!
    lastName: String!
    email: String!
    cellPhone: String
    userRole: UserRole!
    updatedAt: DateTime!
    createdAt: DateTime!

    client: Client!
    jobsFinished(input: PaginationInput): Jobs!
  }

  type CursorResponse {
    beforeCursor: String
    afterCursor: String
  }

  enum CursorType {
    AFTER
    BEFORE
  }

  input CursorInput {
    cursor: String!
    type: CursorType!
  }

  enum PaginationOrder {
    ASC
    DESC
  }

  input PaginationInput {
    limit: Int
    cursor: CursorInput
    order: PaginationOrder
  }

  type Employees {
    data: [Employee!]!
    cursor: CursorResponse!
  }

  type Clients {
    data: [Client!]!
    cursor: CursorResponse!
  }

  type Jobs {
    data: [Job!]!
    cursor: CursorResponse!
  }

  type Customers {
    data: [Customer!]!
    cursor: CursorResponse!
  }

  type Query {
    me: Employee
    employees(input: PaginationInput): Employees!
    employee(id: ID!): Employee

    clients(input: PaginationInput): Clients!
    client(id: ID!): Client

    jobs(input: PaginationInput): Jobs!
    job(id: ID!): Job

    customers(input: PaginationInput): Customers!
    customer(id: ID!): Customer

    # Public
    plans: [StripePlan!]!
  }

  input CreateOrUpdateClientInput {
    name: String!
    stripeCustomerId: String!
  }

  input CreateOrUpdateEmployeeInput {
    clientId: ID!
    firstName: String!
    lastName: String!
    email: String!
    cellPhone: String
    userRole: UserRole!
  }

  input CreateOrUpdateCustomerInput {
    clientId: ID!
    memNum: String
    firstName: String
    lastName: String
    middleInitial: String
    email: Email
    address: String
    address2: String
    city: String
    zip: String
    cellPhone: String
    homePhone: String
    workPhone: String
  }

  input CreateOrUpdateJobInput {
    clientId: ID!
    customerId: ID!
    finished: Boolean!
    name: String
    stringName: String
    racket: String
    tension: String
    gauge: String
    recievedAt: DateTime
    finishedAt: DateTime
    finishedByEmployeeId: ID
  }

  input SignUpInput {
    firstName: String!
    companyName: String!
    lastName: String!
    email: String!
    password: String!
    paymentMethodId: String
  }

  type Mutation {
    signUp(input: SignUpInput!): Client!
    forgotPassword(email: Email!): String!
    resetPassword: String!
    acceptInvitation: Employee!

    createClient(input: CreateOrUpdateClientInput!): Client!
    updateClient(id: ID!, input: CreateOrUpdateClientInput!): Client!
    deleteClient(id: ID!): Boolean!

    createEmployee(input: CreateOrUpdateEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: CreateOrUpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Boolean!

    createCustomer(input: CreateOrUpdateCustomerInput!): Customer!
    updateCustomer(id: ID!, input: CreateOrUpdateCustomerInput!): Customer!
    deleteCustomer(id: ID!): Boolean!

    createJob(input: CreateOrUpdateJobInput!): Job!
    updateJob(id: ID!, input: CreateOrUpdateJobInput!): Job!
    finishJob(id: ID!): Job!
    restartJob(id: ID!): Job!
    deleteJob(id: ID!): Boolean!
  }

  type TextMessageEvent {
    id: ID!
  }

  type Subscription {
    onTextMessageEvent: TextMessageEvent!
  }
`;

export default schema;
