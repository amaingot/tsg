import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "./types";
import Stripe from "../utils/stripe";
import signUp from "./resolvers/signUp";

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
  Client: {},
  Customer: {},
  Employee: {},
  Job: {},
  Query: {
    plans: () => Stripe.getPlans(),
  },
  Mutation: {
    signUp: async (_, { input }) => signUp(input),
  },
};

export default resolvers;
