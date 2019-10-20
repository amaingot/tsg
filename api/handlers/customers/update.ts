import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";
import {
  UpdateCustomerResponse,
  Customer,
  UpdateCustomerRequest
} from "tsg-shared";

const handler: Handler = logger => async event => {
  const request = JSON.parse(event.body) as UpdateCustomerRequest;

  logger.info("Updating customer because of this event: ", event);

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const recordId = event.pathParameters.id;

  const {
    memNumber,
    lastName,
    firstName,
    middleInitial,
    email,
    address,
    address2,
    city,
    zip,
    homePhone,
    cellPhone,
    workPhone
  } = request.data;

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
    logger.info("User is updating something they do not have access to");
    return Responses.forbidden();
  }

  const updatedCustomer = {
    id: recordId,
    memNumber,
    lastName,
    firstName,
    middleInitial,
    email,
    address,
    address2,
    city,
    zip,
    homePhone,
    cellPhone,
    workPhone,
    clientId: client.id,
    updatedAt: new Date().toISOString(),
    createdAt: customer.createdAt
  };

  const updateExpression = dynamoUpdateExp(customer, updatedCustomer);

  const updatedCustomerRecord = await dynamo
    .update({
      TableName: process.env.CUSTOMER_TABLE,
      Key: {
        id: recordId
      },
      ...updateExpression
    })
    .promise();

  const response: UpdateCustomerResponse = {
    data: updatedCustomerRecord.Attributes as Customer
  };

  return Responses.success(response);
};

export default withLogger(handler);
