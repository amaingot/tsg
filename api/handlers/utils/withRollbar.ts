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
  accessToken: process.env.LAMBDA_ROLLBAR_TOKEN
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

    rollbar.log("Received event:", JSON.stringify(event, null, 2));
    return await handler(event, context, callback);
  } catch (err) {
    rollbar.error(err);
    rollbar.wait(() => {
      throw err;
    });
  }
};

export default withRollbar;
