import "source-map-support/register";
import withLogger, { Handler } from "./utils/withLogger";
import { getCognitoUser } from "./utils/cognito";
import * as Responses from "./utils/responses";

const handler: Handler = logger => async event => {
  const { email, code } = JSON.parse(event.body);

  logger.info(`Confirming user: ${email} with code ${code}`);

  const cognitoUser = await getCognitoUser(email);

  const promise = new Promise<{
    result: object;
    error?: { code: string; name: string; message: string };
  }>(resolve => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        logger.error("Failed to confirm a user", err);
      }
      resolve({ result, error: err });
    });
  });

  const response = await promise;

  console.log(response);

  if (response.error) {
    return Responses.internalError(response.error);
  }

  return Responses.success({ message: "success" });
};

export default withLogger(handler);
