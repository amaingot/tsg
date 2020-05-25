import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { getConnection } from "typeorm";

import { openConnection } from "./db";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { GraphqlContext } from "./graphql/context";
import { appLogger, appErrorLogger, logger } from "./utils/logger";
import renderHtml from "./utils/renderHtml";
import { initPubSub } from "./utils/pubsub";

const PORT = 8080;

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
  tracing: true,
  context: async (expressContext): Promise<GraphqlContext> => {
    const { connection } = expressContext;
    if (connection?.context) {
      return connection.context;
    }
    const context = new GraphqlContext({ expressContext });
    await context.parseToken();
    return context;
  },
  subscriptions: {
    onConnect: async (
      connectionParams: { authToken?: string },
      webSocket
    ): Promise<GraphqlContext> => {
      if (connectionParams.authToken) {
        const context = new GraphqlContext({
          authToken: connectionParams.authToken,
          webSocket,
        });
        await context.parseToken();
        return context;
      }
      throw new Error("Missing auth token!");
    },
  },
});

server.applyMiddleware({ app });

app.use(appErrorLogger());

renderHtml(app);

openConnection();
initPubSub();

app.get("/_health/ready", async (_req, res) => {
  const isReady = getConnection().isConnected;

  if (isReady) {
    return res.status(200).send("Ready");
  } else {
    return res.status(500).send("Not ready");
  }
});

app.get("/_health/alive", async (_req, res) => {
  const isReady = getConnection().isConnected;

  if (isReady) {
    return res.status(200).send("Alive");
  } else {
    return res.status(500).send("Not alive");
  }
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  logger.info(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  logger.info(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
