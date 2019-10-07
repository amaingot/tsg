import "source-map-support/register";
import * as Responses from "./utils/responses";
import dynamo from "./utils/dynamo";
import withLogger, { Handler } from "./utils/withLogger";
import { getUser } from "./utils/cognito";

const handler: Handler = logger => async event => {
  const { email } = event.requestContext.authorizer.claims;

  logger.info("Getting customers because of this event: ", event);

  if (!email) {
    return Responses.forbidden();
  }

  logger.info("Getting customers for: " + email);

  const userAttributes = await getUser(email);

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
    return Responses.internalError({
      message: "The user does not have a user record"
    });
  }

  if (!userRecord.Item.clientId) {
    return Responses.internalError({
      message: "The user does not have a client"
    });
  }

  const clientRecord = await dynamo
    .get({
      TableName: process.env.CLIENT_TABLE,
      Key: {
        id: userRecord.Item.clientId
      }
    })
    .promise();

  const customers = await dynamo
    .query({
      TableName: process.env.CUSTOMER_TABLE,
      KeyConditionExpression: "#clientId = :currentClientId",
      ExpressionAttributeNames: {
        "#clientId": "clientId"
      },
      ExpressionAttributeValues: {
        ":currentClientId": clientRecord.Item.id
      }
    })
    .promise();

  return Responses.success({
    data: customers.Items,
    count: customers.Count,
    scannedCount: customers.ScannedCount
  });
};

export default withLogger(handler);
