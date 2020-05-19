import express, { Request, Response } from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";

import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { GraphqlContext } from "./graphql/context";
import { appLogger, appErrorLogger, logger } from "./utils/logger";
import { closeConnection, openConnection } from "./db";
import fetchTrafficIncidents from "./jobs/fetchTrafficIncidents";
import indexTrafficIncidents from "./jobs/indexTrafficIncidents";
import renderHtml from "./utils/renderHtml";

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
  context: async (req: Request, res: Response): Promise<GraphqlContext> => {
    return {
      req,
      res,
    };
  },
});

server.applyMiddleware({ app });

app.get("/jobs/fetch-traffic-incidents", fetchTrafficIncidents);
app.get("/jobs/index-traffic-incidents", indexTrafficIncidents);

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
