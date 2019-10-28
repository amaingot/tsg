import "source-map-support/register";
import withLogger, { Handler } from "../utils/withLogger";
import dynamo from "../utils/dynamo";
import {
  getUser as getCognitoUser,
  disableUser,
  globalSignoutUser,
  UserRecord
} from "../utils/cognito";
import * as Responses from "../utils/responses";
import getUser from "../utils/getUser";
import { Employee } from "tsg-shared";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";
import { sendForgotPasswordEmail } from "../utils/sendgrid";
import generateRandomString from "../utils/generateRandomString";

const handler: Handler = logger => async event => {
  const { email } = JSON.parse(event.body);

  if (!email) {
    return Responses.badRequest();
  }
  logger.info(`Forgot password for user: ${email}`);

  let cognitoUser: UserRecord;

  try {
    cognitoUser = await getCognitoUser(email);
  } catch (e) {
    logger.error(e);
    return Responses.internalError(e);
  }

  const userId = cognitoUser.id;

  try {
    await globalSignoutUser(userId);
    await disableUser(userId);
  } catch (e) {
    logger.error(e);
    return Responses.internalError(e);
  }

  const oldUser = await getUser(userId);

  if (oldUser === undefined) {
    logger.error(
      `Cognito user found, but no user found in dynamodb: ${JSON.stringify(
        cognitoUser
      )}`
    );

    return Responses.internalError({
      message: "User does not exist in our system."
    });
  }

  const updatedUser: Employee = {
    ...oldUser,
    resetPasswordCode: generateRandomString(24)
  };

  const updateExpression = dynamoUpdateExp(oldUser, updatedUser);

  try {
    await dynamo
      .update({
        TableName: process.env.USER_TABLE,
        Key: {
          id: userId
        },
        ...updateExpression
      })
      .promise();
  } catch (e) {
    logger.error(e);
    return Responses.internalError(e);
  }

  const resetPasswordLink = `${event.headers["Origin"]}/reset-password?id=${updatedUser.id}&code=${updatedUser.resetPasswordCode}`;

  await sendForgotPasswordEmail(updatedUser.email, resetPasswordLink);

  return Responses.success();
};

export default withLogger(handler);
