import { APIGatewayProxyHandler } from "aws-lambda";

import * as Responses from "./utils/responses";
import dynamo from "./utils/dynamo";
import withLogger from "./utils/withLogger";
import { getCognitoUser, getUserAttributes } from "./utils/cognito";

const handler: APIGatewayProxyHandler = async (event, _context) => {
  const userEmail = event.requestContext.authorizer.claim.email;

  if (!userEmail) {
    return Responses.forbidden();
  }

  const userAttributes = await getUserAttributes(getCognitoUser(userEmail));

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
