import * as uuid from "uuid/v4";
import "source-map-support/register";

import { Job, CreateJobRequest, CreateJobResponse } from "tsg-shared";

import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { getUser } from "../utils/cognito";

const handler: Handler = logger => async event => {
  const { email: userEmail } = event.requestContext.authorizer.claims;
  const request = JSON.parse(event.body) as Partial<CreateJobRequest>;

  if (!request || !request.data) {
    logger.error("No data provided");
    return Responses.badRequest();
  }

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
  } = request.data;

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
    finished: finishedAt !== undefined,
    recievedAt: recievedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  if (name) newJobData.name = name;
  if (stringName) newJobData.stringName = stringName;
  if (racket) newJobData.racket = racket;
  if (tension) newJobData.tension = tension;
  if (gauge) newJobData.gauge = gauge;
  if (finishedAt) newJobData.finishedAt = finishedAt;

  await dynamo
    .put({
      TableName: process.env.JOB_TABLE,
      Item: newJobData
    })
    .promise();

  const response: CreateJobResponse = {
    data: newJobData
  };

  return Responses.success(response);
};

export default withLogger(handler);
