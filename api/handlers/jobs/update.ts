import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { UpdateJobRequest, Job, UpdateJobResponse } from "tsg-shared";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";

const handler: Handler = logger => async event => {
  const request = JSON.parse(event.body) as UpdateJobRequest;

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const recordId = event.pathParameters.id;

  const {
    customerId,
    name,
    stringName,
    racket,
    tension,
    gauge,
    recievedAt,
    finishedAt,
    finished
  } = request.data;

  if (!customerId || typeof customerId !== "string") {
    logger.error("No customer id was provided");
    return Responses.badRequest("No customer id was provided");
  }

  const { client } = await getUserClient(event, logger);

  const oldJobRecord = await dynamo
    .get({
      TableName: process.env.JOB_TABLE,
      Key: {
        id: recordId
      }
    })
    .promise();

  const oldJob = oldJobRecord.Item as Job;

  if (oldJob.clientId !== client.id) {
    logger.info("User is updating something they do not have access to");
    return Responses.forbidden();
  }

  const updatedJob: Job = {
    id: recordId,
    clientId: client.id,
    customerId,
    name,
    stringName,
    racket,
    tension,
    gauge,
    recievedAt,
    finishedAt,
    finished,
    updatedAt: new Date().toISOString(),
    createdAt: oldJob.createdAt
  };

  const updateExpression = dynamoUpdateExp(oldJob, updatedJob);

  const updatedRecord = await dynamo
    .update({
      TableName: process.env.JOB_TABLE,
      Key: {
        id: recordId
      },
      ...updateExpression
    })
    .promise();

  const response: UpdateJobResponse = {
    data: updatedRecord.Attributes as Job
  };

  return Responses.success(response);
};

export default withLogger(handler);
