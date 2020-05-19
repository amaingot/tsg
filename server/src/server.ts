import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";

import { closeConnection, openConnection } from "./db";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { GraphqlContext } from "./graphql/context";
import { appLogger, appErrorLogger, logger } from "./utils/logger";
import renderHtml from "./utils/renderHtml";
import auth from "./utils/auth";

const config = {
  name: "austin-data",
  port: 8080,
  host: "0.0.0.0",
};

const app = express();

app.use(appLogger());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  debug: true,
  introspection: true,
  playground: true,
  cacheControl: {
    defaultMaxAge: 500,
  },
  context: async (expressContext): Promise<GraphqlContext> => {
    const context = new GraphqlContext(expressContext);
    await context.parseToken();
    return context;
  },
});

server.applyMiddleware({ app });

app.use(appErrorLogger());

renderHtml(app);

openConnection();

const expressServer = app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

const shutDown = () => {
  logger.info("Received kill signal, shutting down gracefully");
  expressServer.close(async () => {
    logger.info("Closed out remaining connections");

    await closeConnection();
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 5000);
};

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
