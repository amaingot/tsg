import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { getUser } from "../utils/cognito";

const handler: Handler = logger => async event => {
  const { email } = event.requestContext.authorizer.claims;

  logger.info("Getting jobs because of this event: ", event);

  if (!email) {
    return Responses.forbidden();
  }

  logger.info("Getting jobs for: " + email);

  const userAttributes = await getUser(email);

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

  const jobs = await dynamo
    .scan({
      TableName: process.env.JOB_TABLE,
      Limit: 100,
      FilterExpression: "#name0 = :value0",
      ExpressionAttributeValues: {
        ":value0": { type: "String", stringValue: clientRecord.Item.id }
      },
      ExpressionAttributeNames: { "#name0": "clientId" }
    })
    .promise();

  return Responses.success({
    data: jobs.Items,
    count: jobs.Count,
    scannedCount: jobs.ScannedCount
  });
};

export default withLogger(handler);
