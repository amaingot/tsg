import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "../types";
import Stripe from "../../utils/stripe";
import { signUp } from "./signUp";
import { forgotPassword, login, resetPassword } from "./auth";
import {
  users,
  createUser,
  updateUser,
  archiveUser,
  unarchiveUser,
  impersonateEmployee,
} from "./user";
import {
  customers,
  customer,
  createCustomer,
  updateCustomer,
  archiveCustomer,
  unarchiveCustomer,
} from "./customer";

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
  Customer: {},
  Employee: {},
  Job: {},
  Query: {
    plans: () => Stripe.getPlans(),

    // Users
    users,

    // Customers
    customer,
    customers,
  },
  Mutation: {
    signUp,

    // Auth
    login,
    forgotPassword,
    resetPassword,

    // Users
    createUser,
    updateUser,
    archiveUser,
    unarchiveUser,
    impersonateEmployee,

    // Customers
    createCustomer,
    updateCustomer,
    archiveCustomer,
    unarchiveCustomer,
  },
};

export default resolvers;
