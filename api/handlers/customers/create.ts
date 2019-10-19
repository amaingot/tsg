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
import getUserClient from "../utils/getUserClient";

const handler: Handler = logger => async event => {
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

  const { client } = await getUserClient(event, logger);


  const newCustomerId = uuid();

  const customerData: Customer = {
    id: newCustomerId,
    clientId: client.id,
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
