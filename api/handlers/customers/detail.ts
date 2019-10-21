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

  const customerRecord = await dynamo
    .get({
      TableName: process.env.CUSTOMER_TABLE,
      Key: {
        id: recordId
      }
    })
    .promise();

  const customer = customerRecord.Item as Customer;

  if (customer.clientId !== client.id) {
    logger.info("User is accessing something they do not have access to");
    return Responses.forbidden();
  }

  const customerJobRecords = await dynamo
    .query({
      TableName: process.env.JOB_TABLE,
      IndexName: "CustomerJobs",
      KeyConditionExpression: "customerId = :customerId",
      ExpressionAttributeValues: {
        ":customerId": customer.id
      }
    })
    .promise();

  const customerJobs = customerJobRecords.Items as Array<Job>;

  const response: GetCustomerResponse = {
    data: {
      customer: customer,
      jobs: customerJobs
    }
  };

  return Responses.success(response);
};

export default withLogger(handler);
