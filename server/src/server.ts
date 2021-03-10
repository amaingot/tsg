import http from "http";
import express from "express";

import { openConnection } from "./db";
import { appLogger, appErrorLogger, logger } from "./utils/logger";
// import { initPubSub } from "./utils/pubsub";
import { mountEndpoints } from "./endpoints";
import { mountGraphql } from "./graphql";

const PORT = 8080;
const app = express();
const httpServer = http.createServer(app);

app.use(appLogger());

openConnection();
// initPubSub();
mountEndpoints(app);
mountGraphql(app, httpServer);

app.use(appErrorLogger());

httpServer.listen(PORT, () => {
  logger.info(`🚀 Server ready`);
});
