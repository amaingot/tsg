import {
  APIGatewayProxyHandler as APIGW,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  Callback
} from "aws-lambda";
import AWSXRay from "aws-xray-sdk-core";
import * as Responses from "./responses";

import * as Winston from "winston";
import RollbarTransport from "winston-transport-rollbar-3";

const rollbarConfig = {
  accessToken: process.env.LAMBDA_ROLLBAR_TOKEN,
  enabled: process.env.ENV !== "dev",
  captureUncaught: true,
  captureUnhandledRejections: true,
  logLevel: "warning",
  payload: {
    environment: process.env.ENV,
    client: {
      javascript: {
        code_version: process.env.CODE_VERSION
      }
    }
  }
};

export type Handler = (logger: Winston.Logger) => APIGW;

type LoggerEnhancer = (
  handler: Handler
) => (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => Promise<void | APIGatewayProxyResult>;

const withLogger: LoggerEnhancer = (handler: Handler) => async (
  event,
  context,
  callback
) => {
  if (
    event.requestContext.authorizer &&
    event.requestContext.authorizer.claims
  ) {
    rollbarConfig.payload["person"] = {
      id: event.requestContext.authorizer.claims["cognito:username"],
      email: event.requestContext.authorizer.claims["email"]
    };
  }

  const logger = Winston.createLogger({
    format: Winston.format.json(),
    level: "debug",
    transports: [
      new RollbarTransport({ rollbarConfig, level: "warning" }),
      new Winston.transports.Console({
        format: Winston.format.simple()
      })
    ]
  });
  AWSXRay.setLogger(Winston);

  logger.info("Received event:", event);

  try {
    return await handler(logger)(event, context, callback);
  } catch (err) {
    logger.error("Fatal error", err);
    return Responses.internalError(err);
  }
};

export default withLogger;
