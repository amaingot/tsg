import * as uuid from "uuid/v4";
import "source-map-support/register";
import {
  Customer,
  CreateCustomerResponse,
  CreateCustomerRequest
} from "tsg-shared";

import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { getUser } from "../utils/cognito";

const handler: Handler = logger => async event => {
  const { email: userEmail } = event.requestContext.authorizer.claims;
  const request = JSON.parse(event.body) as Partial<CreateCustomerRequest>;

  if (!request || !request.data) {
    logger.error("No data provided");
    return Responses.badRequest();
  }

  logger.info("Creating a new customer because of this event: ", event);

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

  if (!firstName || !lastName) {
    logger.error("No firstName and/or lastName provided");
    return Responses.badRequest();
  }

  if (!userEmail) {
    logger.error("No user claim in event");
    return Responses.forbidden();
  }

  logger.info("Creating customer for: " + userEmail);

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

  const newCustomerId = uuid();

  const customerData: Customer = {
    id: newCustomerId,
    clientId: clientRecord.Item.id,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  if (memNumber) customerData.memNumber = memNumber;
  if (lastName) customerData.lastName = lastName;
  if (firstName) customerData.firstName = firstName;
  if (middleInitial) customerData.middleInitial = middleInitial;
  if (email) customerData.email = email;
  if (address) customerData.address = address;
  if (address2) customerData.address2 = address2;
  if (city) customerData.city = city;
  if (zip) customerData.zip = zip;
  if (homePhone) customerData.homePhone = homePhone;
  if (cellPhone) customerData.cellPhone = cellPhone;
  if (workPhone) customerData.workPhone = workPhone;

  await dynamo
    .put({
      TableName: process.env.CUSTOMER_TABLE,
      Item: customerData
    })
    .promise();

  const response: CreateCustomerResponse = {
    data: customerData
  };

  return Responses.success(response);
};

export default withLogger(handler);
