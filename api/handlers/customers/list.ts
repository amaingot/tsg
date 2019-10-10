import "source-map-support/register";

import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { getUser } from "../utils/cognito";
import { ListCustomersResponse, Customer } from "tsg-shared";

const handler: Handler = logger => async event => {
  const { email } = event.requestContext.authorizer.claims;

  logger.info("Getting customers because of this event: ", event);

  if (!email) {
    logger.error("No user claim in event");
    return Responses.forbidden();
  }

  logger.info("Getting customers for: " + email);

  const userAttributes = await getUser(email);

  logger.info("Current user attributes: ", userAttributes);

  const userId = userAttributes.id;

  console.log("Getting User", {
    TableName: process.env.USER_TABLE,
    Key: {
      id: userId
    }
  });
  const userRecord = await dynamo
    .get({
      TableName: process.env.USER_TABLE,
      Key: {
        id: userId
      }
    })
    .promise();
  console.log("Got User");

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

  logger.info(
    `Fetched client record: ${JSON.stringify(clientRecord, null, 2)}`
  );

  const customers = await dynamo
    .scan({
      TableName: process.env.CUSTOMER_TABLE,
      ExpressionAttributeValues: {
        ":value0": clientRecord.Item.id
      },
      FilterExpression: "clientId = :value0"
    })
    .promise();

  const response: ListCustomersResponse = {
    data: customers.Items as Array<Customer>,
    count: customers.Count,
    scannedCount: customers.ScannedCount
  };

  return Responses.success(response);
};

export default withLogger(handler);
