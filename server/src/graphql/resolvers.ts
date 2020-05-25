import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "./types";
import * as DB from "../db";
import Stripe from "../utils/stripe";

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
  Client: {
    jobs: (parent, { input }, context) =>
      DB.findMany({
        target: DB.Job,
        input,
        query: (qb) => qb.where({ clientId: parent.id }),
        context,
      }),
    customers: (parent, { input }, context) =>
      DB.findMany({
        target: DB.Customer,
        input,
        query: (qb) => qb.where({ clientId: parent.id }),
        context,
      }),
    employees: (parent, { input }, context) =>
      DB.findMany({
        target: DB.Employee,
        input,
        query: (qb) => qb.where({ clientId: parent.id }),
        context,
      }),
  },
  Customer: {
    jobs: (parent, { input }, context) =>
      DB.findMany({
        target: DB.Job,
        input,
        query: (qb) => qb.where({ customerId: parent.id }),
        context,
      }),
  },
  Employee: {
    jobsFinished: (parent, { input }, context) =>
      DB.findMany({
        target: DB.Job,
        input,
        query: (qb) => qb.where({ finishedByEmployeeId: parent.id }),
        context,
      }),
  },
  Job: {
    customer: ({ customerId }, _args, context) =>
      DB.findOneOrFail({ target: DB.Customer, id: customerId, context }),
    client: ({ clientId }, _args, context) =>
      DB.findOneOrFail({ target: DB.Client, id: clientId, context }),
    finishedByEmployee: ({ finishedByEmployeeId }, _args, context) =>
      DB.findOne({ target: DB.Employee, id: finishedByEmployeeId, context }),
  },
  Query: {
    clients: (_, { input }, context) =>
      DB.findMany({
        target: DB.Client,
        input,
        context,
      }),
    client: (_, { id }, context) =>
      DB.findOne({ target: DB.Client, id, context }),

    customers: (_, { input }, context) =>
      DB.findMany({
        target: DB.Customer,
        input,
        context,
      }),
    customer: (_, { id }, context) =>
      DB.findOne({ target: DB.Customer, id, context }),

    jobs: (_, { input }, context) =>
      DB.findMany({ target: DB.Job, input, context }),
    job: (_, { id }, context) => DB.findOne({ target: DB.Job, id, context }),

    employees: (_, { input }, context) =>
      DB.findMany({ target: DB.Employee, input, context }),
    employee: (_, { id }, context) =>
      DB.findOne({ target: DB.Employee, id, context }),
    plans: () => Stripe.getPlans(),
  },
  Mutation: {
    createClient: async (_, { input }, context) =>
      DB.createOne({ target: DB.Client, item: input, context }),
    updateClient: async (_, { input, id }, context) =>
      DB.updateOne({
        target: DB.Client,
        id,
        updatedItem: input,
        context,
      }),
    deleteClient: async (_, { id }, context) =>
      DB.deleteOne({ target: DB.Client, id, context }),

    createCustomer: async (_, { input }, context) =>
      DB.createOne({ target: DB.Customer, item: input, context }),
    updateCustomer: (_, { input, id }, context) =>
      DB.updateOne({
        target: DB.Customer,
        id,
        updatedItem: input,
        context,
      }),
    deleteCustomer: async (_, { id }, context) =>
      DB.deleteOne({ target: DB.Customer, id, context }),

    createJob: async (_, { input }, context) =>
      DB.createOne({ target: DB.Job, item: input, context }),
    updateJob: (_, { input, id }, context) =>
      DB.updateOne({
        target: DB.Job,
        id,
        updatedItem: input,
        context,
      }),
    deleteJob: async (_, { id }, context) =>
      DB.deleteOne({ target: DB.Job, id, context }),

    createEmployee: async (_, { input }, context) =>
      DB.createOne({ target: DB.Employee, item: input, context }),
    updateEmployee: (_, { input, id }, context) =>
      DB.updateOne({
        target: DB.Employee,
        id,
        updatedItem: input,
        context,
      }),
    deleteEmployee: async (_, { id }, context) =>
      DB.deleteOne({ target: DB.Employee, id, context }),
  },
};

export default resolvers;
