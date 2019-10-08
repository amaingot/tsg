import * as uuid from "uuid/v4";
import "source-map-support/register";
import { Job } from "tsg-shared";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { getUser } from "../utils/cognito";

const handler: Handler = logger => async event => {
  const { email: userEmail } = event.requestContext.authorizer.claims;
  const request = JSON.parse(event.body);

  logger.info("Creating a new job because of this event: ", event);

  const {
    customerId,
    name,
    stringName,
    racket,
    tension,
    gauge,
    recievedAt,
    finishedAt
  } = request;

  if (!customerId || typeof customerId !== "string") {
    logger.error("No customerId provided");
    return Responses.badRequest();
  }

  if (!userEmail) {
    logger.error("No user claim in event");
    return Responses.forbidden();
  }

  logger.info("Creating job for: " + userEmail);

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

  const newJobId = uuid();

  const newJobData: Job = {
    id: newJobId,
    clientId: clientRecord.Item.id as string,
    customerId,
    name,
    stringName,
    racket,
    tension,
    gauge,
    finished: finishedAt !== undefined,
    recievedAt: recievedAt || new Date().toISOString(),
    finishedAt,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  const newJob = await dynamo
    .put({
      TableName: process.env.JOB_TABLE,
      Item: newJobData
    })
    .promise();

  return Responses.success({
    data: { ...newJob.Attributes }
  });
};

export default withLogger(handler);
