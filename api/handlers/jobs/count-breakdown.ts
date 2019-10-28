import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { Job, JobsBreakdownResponse } from "tsg-shared";
import moment from "moment";

const handler: Handler = logger => async event => {
  const { client } = await getUserClient(event, logger);

  const jobRecords = await dynamo
    .query({
      TableName: process.env.JOB_TABLE,
      IndexName: "ClientJobsByCreated",
      KeyConditionExpression: "clientId = :clientId AND createdAt > :createdAt",
      ExpressionAttributeValues: {
        ":clientId": client.id,
        ":createdAt": moment()
          .subtract(1, "year")
          .toISOString()
      }
    })
    .promise();

  const jobsMonthlyBreakdown = {};
  const jobs = jobRecords.Items as Array<Job>;

  jobs.forEach(j => {
    const finishedAt = moment(j.finishedAt);
    const monthKey = finishedAt.format("YYYYMM");
    if (jobsMonthlyBreakdown[monthKey]) {
      jobsMonthlyBreakdown[monthKey]["count"] += 1;
    } else {
      jobsMonthlyBreakdown[monthKey] = {
        count: 1,
        month: finishedAt.format("MMM YY")
      };
    }
  });

  const response: JobsBreakdownResponse = {
    data: { byMonth: jobsMonthlyBreakdown }
  };

  return Responses.success(response);
};

export default withLogger(handler);
