import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { GetCustomerResponse, Customer, Job } from "tsg-shared";

const handler: Handler = logger => async event => {
  const recordId = event.pathParameters.id;

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const { client } = await getUserClient(event, logger);

  const customer = await dynamo
    .get({
      TableName: process.env.CUSTOMER_TABLE,
      Key: {
        id: recordId
      }
    })
    .promise();

  if (customer.Item.clientId !== client.id) {
    logger.info("User is accessing something they do not have access to");
    return Responses.forbidden();
  }

  const customerJobs = await dynamo
    .scan({
      TableName: process.env.JOB_TABLE,
      ExpressionAttributeValues: {
        ":value0": customer.Item.id
      },
      FilterExpression: "customerId = :value0"
    })
    .promise();

  const response: GetCustomerResponse = {
    data: {
      customer: customer.Item as Customer,
      jobs: customerJobs.Items as Array<Job>
    }
  };

  return Responses.success(response);
};

export default withLogger(handler);
