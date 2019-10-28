import "source-map-support/register";
import { Employee } from "tsg-shared";
import withLogger, { Handler } from "../utils/withLogger";
import dynamo from "../utils/dynamo";
import {
  getUser as getCognitoUser,
  setUserPassword,
  enableUser,
  setUserAttribute
} from "../utils/cognito";
import * as Responses from "../utils/responses";
import getUser from "../utils/getUser";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";

const handler: Handler = logger => async event => {
  const { id, code, password } = JSON.parse(event.body);

  if (!id) {
    return Responses.badRequest();
  }
  logger.info(`Accepting user invite for user id: ${id}`);

  const userRecord = await getUser(id);

  if (userRecord === undefined) {
    logger.error(
      `Cognito user found, but no user found in dynamodb: ${JSON.stringify(
        userRecord
      )}`
    );

    return Responses.internalError({
      message: "User does not exist in our system"
    });
  }

  if (userRecord.confirmAccountCode !== code) {
    logger.error(
      `User attempting to accept invitation with an invalid code (${code}), user record: ${JSON.stringify(
        userRecord
      )}`
    );
    return Responses.forbidden({
      message:
        "Your code is no longer valid, please visit the forgot password page to request a new code"
    });
  }

  try {
    await getCognitoUser(userRecord.email);
  } catch (e) {
    logger.error(e);
    return Responses.internalError(e);
  }

  try {
    await enableUser(userRecord.id);
    await setUserPassword(userRecord.id, password);
    await setUserAttribute(userRecord.id, "email_verified", "true");
  } catch (e) {
    logger.error(e);
    return Responses.badRequest(e);
  }

  const updatedUserRecord: Employee = {
    ...userRecord,
    confirmAccountCode: undefined
  };

  const updateExpression = dynamoUpdateExp(userRecord, updatedUserRecord);

  try {
    await dynamo
      .update({
        TableName: process.env.USER_TABLE,
        Key: {
          id: userRecord.id
        },
        ...updateExpression
      })
      .promise();
  } catch (e) {
    logger.error(e);
    return Responses.internalError(e);
  }

  return Responses.success({ email: updatedUserRecord.email });
};

export default withLogger(handler);
