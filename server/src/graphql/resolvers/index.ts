import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "../types";
import Stripe from "../../utils/stripe";
import { signUp } from "./signUp";
import * as Customers from "./customer";
import * as Users from "./user";
import * as Employees from "./employee";
import * as Jobs from "./job";
import * as Auth from "./auth";

const resolvers: Partial<Resolvers> = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date time represented as an ISO String",
    parseValue: (value) => {
      try {
        return new Date(value);
      } catch (e) {
        throw new UserInputError("Invalid DateTime input");
      }
    },
    serialize: (value: Date) => {
      return value.toISOString();
    },
  }),
  Account: {},
  Customer: {
    history: Customers.getHistory,
    details: Customers.getDetails,
    relationships: Customers.getRelationships,
  },
  Employee: {},
  Job: {},
  Query: {
    plans: Stripe.getPlans,

    // Users
    users: Users.list,

    // Customers
    customer: Customers.get,
    customers: Customers.list,

    // Employees
    employee: Employees.get,
    employees: Employees.list,

    // Jobs
    job: Jobs.get,
    jobs: Jobs.list,
  },
  Mutation: {
    signUp,

    // Auth
    login: Auth.login,
    forgotPassword: Auth.forgotPassword,
    resetPassword: Auth.resetPassword,
    impersonateEmployee: Users.impersonate,

    // Users
    createUser: Users.create,
    updateUser: Users.update,
    archiveUser: Users.archive,
    unarchiveUser: Users.unarchive,

    // Customers
    createCustomer: Customers.create,
    updateCustomer: Customers.update,
    archiveCustomer: Customers.archive,
    unarchiveCustomer: Customers.unarchive,

    // Employees
    createEmployee: Employees.create,
    updateEmployee: Employees.update,
    archiveEmployee: Employees.archive,
    unarchiveEmployee: Employees.unarchive,

    // Jobs
    createJob: Jobs.create,
    updateJob: Jobs.update,
    archiveJob: Jobs.archive,
    unarchiveJob: Jobs.unarchive,
  },
};

export default resolvers;
