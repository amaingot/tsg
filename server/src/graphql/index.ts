import fs from "fs";
import path from "path";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";

import resolvers from "./resolvers";
import { GraphqlContext } from "./context";
import { Application } from "express";
import { Server } from "http";

const typeDefs = fs
  .readFileSync(path.join(__dirname, "schema.graphql"), "utf8")
  .toString();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const graphqlServer = new ApolloServer({
  schema,
  debug: true,
  introspection: true,
  playground: true,
  cacheControl: {
    defaultMaxAge: 500,
  },
  tracing: true,
  context: GraphqlContext.fromHttpRequest,
  subscriptions: {
    onConnect: GraphqlContext.fromWebSocket,
  },
});

export const mountGraphql = (app: Application, server: Server) => {
  graphqlServer.applyMiddleware({ app });
  graphqlServer.installSubscriptionHandlers(server);
};