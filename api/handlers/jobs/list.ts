import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { ListJobsResponse, Job } from "tsg-shared";

const handler: Handler = logger => async event => {
  const { client } = await getUserClient(event, logger);

  const jobs = await dynamo
    .scan({
      TableName: process.env.JOB_TABLE,
      Limit: 100,
      FilterExpression: "clientId = :value0",
      ExpressionAttributeValues: {
        ":value0": client.id
      }
    })
    .promise();

  const response: ListJobsResponse = {
    data: jobs.Items as Array<Job>,
    count: jobs.Count
  };

  return Responses.success(response);
};

export default withLogger(handler);
