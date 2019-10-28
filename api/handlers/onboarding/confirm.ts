import "source-map-support/register";
import { Employee } from "tsg-shared";
import withLogger, { Handler } from "../utils/withLogger";
import dynamo from "../utils/dynamo";
import { enableUser, setUserAttribute } from "../utils/cognito";
import * as Responses from "../utils/responses";
import getUser from "../utils/getUser";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";

const handler: Handler = logger => async event => {
  const { id, code } = JSON.parse(event.body);

  if (!id) {
    return Responses.badRequest();
  }
  logger.info(`Confirming account for user id: ${id}`);

  let userRecord: Employee;

  try {
    userRecord = await getUser(id);
  } catch (e) {
    logger.error(e);

    return Responses.internalError({
      message: "User does not exist in our system"
    });
  }

  if (userRecord === undefined) {
    logger.error(`No user found in dynamodb: ${JSON.stringify(userRecord)}`);

    return Responses.internalError({
      message: "User does not exist in our system"
    });
  }

  if (userRecord.confirmAccountCode !== code) {
    logger.error(
      `User attempting to confirm account with invalid code (${code}), user record: ${JSON.stringify(
        userRecord
      )}`
    );
    return Responses.forbidden({
      message:
        "Your sign up link is no longer valid, please visit the forgot password page to request a new link"
    });
  }

  try {
    await enableUser(userRecord.id);
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
