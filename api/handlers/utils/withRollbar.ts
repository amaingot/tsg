import {
  APIGatewayProxyHandler as APIGW,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  Callback
} from "aws-lambda";
import * as Rollbar from "rollbar";
import AWSXRay from "aws-xray-sdk-core";

const rollbar = new Rollbar({
  accessToken: process.env.LAMBDA_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  reportLevel: "warning",
  payload: {
    environment: process.env.ENV,
    client: {
      javascript: {
        code_version: process.env.CODE_VERSION
      }
    }
  }
});
type RollbarEnhancer = (
  handler: APIGW
) => (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => Promise<void | APIGatewayProxyResult>;

const withRollbar: RollbarEnhancer = (handler: APIGW) => async (
  event,
  context,
  callback
) => {
  try {
    AWSXRay.setLogger(rollbar);

    if (
      event.requestContext.authorizer &&
      event.requestContext.authorizer.claims
    ) {
      rollbar.configure({
        payload: {
          person: {
            id: event.requestContext.authorizer.claims["cognito:username"],
            email: event.requestContext.authorizer.claims["email"]
          }
        }
      });
    }

    rollbar.log("Received event:", event);
    return await handler(event, context, callback);
  } catch (err) {
    rollbar.error(err);
    rollbar.wait(() => {
      throw err;
    });
  }
};

export default withRollbar;
