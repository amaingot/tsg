import "source-map-support/register";
import withLogger, { Handler } from "./utils/withLogger";
import { getCognitoUser } from "./utils/cognito";
import * as Responses from "./utils/responses";

const handler: Handler = logger => async event => {
  const { email, code } = JSON.parse(event.body);

  logger.info(`Confirming user: ${email} with code ${code}`);

  const cognitoUser = await getCognitoUser(email);

  const promise = new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        logger.error("Failed to confirm a user", err);
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

export default withLogger(handler);
