import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { Job, UpdateJobResponse } from "tsg-shared";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";

const handler: Handler = logger => async event => {
  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const recordId = event.pathParameters.id;

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

  if (oldJob.finished || !!oldJob.finishedAt) {
    logger.info("User is trying to finish a job that is already finished");
    return Responses.badRequest(
      "You are trying to finish a job that is already finished"
    );
  }

  const updatedJob: Job = {
    ...oldJob,
    updatedAt: new Date().toISOString(),
    finished: true,
    finishedAt: new Date().toISOString()
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
