import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { getUser } from "../utils/cognito";

const handler: Handler = logger => async event => {
  const { email: userEmail } = event.requestContext.authorizer.claims;
  const request = JSON.parse(event.body);

  logger.info("Updating job because of this event: ", event);

  if (!userEmail) {
    logger.error("No user claim in event");
    return Responses.forbidden();
  }

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const recordId = event.pathParameters.id;

  const {
    name,
    stringName,
    racket,
    tension,
    gauge,
    recievedAt,
    finishedAt
  } = request;

  logger.info("Updating job for: " + userEmail);

  const userAttributes = await getUser(userEmail);

  logger.info("Current user attributes: ", userAttributes);

  const userId = userAttributes.id;

  const userRecord = await dynamo
    .get({
      TableName: process.env.USER_TABLE,
      Key: {
        id: userId
      }
    })
    .promise();

  if (!userRecord) {
    logger.error(
      `The user does not have a user record. Cognito User: ${userAttributes}`
    );
    return Responses.internalError({
      message: "The user does not have a user record"
    });
  }

  if (!userRecord.Item.clientId) {
    logger.error(
      `The user record does not have a client. User Record: ${userRecord}`
    );
    return Responses.internalError({
      message: "The user does not have a client"
    });
  }

  logger.info(`Fetched user record: ${userRecord}`);

  const clientRecord = await dynamo
    .get({
      TableName: process.env.CLIENT_TABLE,
      Key: {
        id: userRecord.Item.clientId
      }
    })
    .promise();

  if (!clientRecord) {
    logger.error(
      `The client record does not exist. User Record: ${userRecord}`
    );
    return Responses.internalError({
      message: "The user does not have a user record"
    });
  }

  logger.info(`Fetched client record: ${clientRecord}`);

  const updatedRecord = await dynamo
    .update({
      TableName: process.env.JOB_TABLE,
      Key: {
        id: recordId
      },
      UpdateExpression:
        "set name=:name, stringName=:stringName, racket=:racket, tension=:tension, gauge=:gauge, recievedAt=:recievedAt, finishedAt=:finishedAt",
      ExpressionAttributeValues: {
        ":name": name,
        ":stringName": stringName,
        ":racket": racket,
        ":tension": tension,
        ":gauge": gauge,
        ":recievedAt": recievedAt,
        ":finishedAt": finishedAt
      }
    })
    .promise();

  return Responses.success({
    data: updatedRecord.Attributes
  });
};

export default withLogger(handler);
