import * as uuid from "uuid/v4";
import "source-map-support/register";
import { Job, CreateJobRequest, CreateJobResponse } from "tsg-shared";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";

const handler: Handler = logger => async event => {
  const request = JSON.parse(event.body) as Partial<CreateJobRequest>;

  if (!request || !request.data) {
    logger.error("No data provided");
    return Responses.badRequest();
  }

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
    return Responses.badRequest("No customerId provided");
  }

  const { client } = await getUserClient(event, logger);

  const newJobId = uuid();

  const newJobData: Job = {
    id: newJobId,
    clientId: client.id as string,
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
