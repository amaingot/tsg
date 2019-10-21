import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { GetJobResponse, Customer, Job } from "tsg-shared";

const handler: Handler = logger => async event => {
  const recordId = event.pathParameters.id;

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const { client } = await getUserClient(event, logger);

  const jobRecord = await dynamo
    .get({
      TableName: process.env.JOB_TABLE,
      Key: {
        id: recordId
      }
    })
    .promise();

  const job = jobRecord.Item as Job;

  if (job.clientId !== client.id) {
    logger.info("User is accessing something they do not have access to");
    return Responses.forbidden();
  }

  const customerRecord = await dynamo
    .get({
      TableName: process.env.CUSTOMER_TABLE,
      Key: {
        id: job.customerId
      }
    })
    .promise();

  const customer = customerRecord.Item as Customer;

  const response: GetJobResponse = {
    data: {
      customer,
      job
    }
  };

  return Responses.success(response);
};

export default withLogger(handler);
