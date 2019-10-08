import uuid from "uuid/v4";
import "source-map-support/register";
import * as Responses from "./utils/responses";
import dynamo from "./utils/dynamo";
import withLogger, { Handler } from "./utils/withLogger";
import { getUser } from "./utils/cognito";

const handler: Handler = logger => async event => {
  const { email: userEmail } = event.requestContext.authorizer.claims;
  const request = JSON.parse(event.body);

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
  } = request;

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

  const newCustomer = await dynamo
    .put({
      TableName: process.env.CUSTOMER_TABLE,
      Item: {
        id: newCustomerId,
        clientId: clientRecord.Item.id,
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
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    })
    .promise();

  return Responses.success({
    data: { ...newCustomer.Attributes }
  });
};

export default withLogger(handler);
