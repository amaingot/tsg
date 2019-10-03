import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

import withRollbar from "./utils/withRollbar";
import { getCognitoUser } from "./utils/cognito";
import * as Responses from "./utils/responses";

const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { email } = JSON.parse(event.body);

  if (!email) {
    return Responses.badRequest();
  }

  const cognitoUser = getCognitoUser(email);

  const promise = new Promise((resolve, reject) => {
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error("Failed to resend confirmation code ", err);
        reject(err);
      }
      resolve(result);
    });
  });

  const response = await promise;

  if (typeof response === "string") {
    return Responses.success(JSON.parse(response));
  }

  if (typeof response === "object") {
    return Responses.success(response);
  }

  return Responses.success();
};

export default withRollbar(handler);
