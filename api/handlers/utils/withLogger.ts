import {
  APIGatewayProxyHandler as APIGW,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  Callback
} from "aws-lambda";
import Raven from "raven";
import RavenLambdaWrapper from "serverless-sentry-lib";

type WithLoggerEnhancer = (
  handler: APIGW
) => (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => Promise<void | APIGatewayProxyResult>;

const withLogger: WithLoggerEnhancer = (handler: APIGW) => async (
  event,
  context,
  callback
) => {
    if (event.requestContext.authorizer && event.requestContext.authorizer.claims) {
      console.log({
        payload: {
          person: {
            id: event.requestContext.authorizer.claims["cognito:username"],
            email: event.requestContext.authorizer.claims["email"]
          }
        }
      });
    }

    return await RavenLambdaWrapper.handler(Raven, handler(event, context, callback));
};

export default withLogger;
