import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "./types";
import {
  Client,
  Customer,
  Job,
  Employee,
  findMany,
  findOne,
  deleteOne,
} from "../db";
import { updateOne, findOneOrFail } from "src/db/helpers";

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
    jobs: (parent, { input }) =>
      findMany(Job, input, {
        alias: "c",
        query: (qb) => qb.where({ clientId: parent.id }),
      }),
    customers: (parent, { input }) =>
      findMany(Customer, input, {
        alias: "c",
        query: (qb) => qb.where({ clientId: parent.id }),
      }),
    employees: (parent, { input }) =>
      findMany(Employee, input, {
        alias: "c",
        query: (qb) => qb.where({ clientId: parent.id }),
      }),
  },
  Customer: {
    jobs: (parent, { input }) =>
      findMany(Job, input, {
        alias: "c",
        query: (qb) => qb.where({ customerId: parent.id }),
      }),
  },
  Employee: {
    jobsFinished: (parent, { input }) =>
      findMany(Job, input, {
        alias: "c",
        query: (qb) => qb.where({ finishedByEmployeeId: parent.id }),
      }),
  },
  Job: {
    customer: ({ customerId }) => findOneOrFail(Customer, customerId),
    client: ({ clientId }) => findOneOrFail(Client, clientId),
    finishedByEmployee: ({ finishedByEmployeeId }) =>
      findOne(Employee, finishedByEmployeeId),
  },
  Query: {
    clients: (_, { input }) => findMany(Client, input),
    client: (_, { id }) => findOne(Client, id),
    customers: (_, { input }) => findMany(Customer, input),
    customer: (_, { id }) => findOne(Customer, id),
    jobs: (_, { input }) => findMany(Job, input),
    job: (_, { id }) => findOne(Job, id),
    employees: (_, { input }) => findMany(Employee, input),
    employee: (_, { id }) => findOne(Employee, id),
  },
  Mutation: {
    updateClient: (_, { input }) => updateOne(Client, input.id, input),
    deleteClient: async (_, { id }) => deleteOne(Client, id),
    updateCustomer: (_, { input }) => updateOne(Customer, input.id, input),
    deleteCustomer: async (_, { id }) => deleteOne(Customer, id),
    updateJob: (_, { input }) => updateOne(Job, input.id, input),
    deleteJob: async (_, { id }) => deleteOne(Job, id),
    updateEmployee: (_, { input }) => updateOne(Employee, input.id, input),
    deleteEmployee: async (_, { id }) => deleteOne(Employee, id),
  },
};

export default resolvers;
