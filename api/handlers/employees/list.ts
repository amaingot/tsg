import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { UserRoles, ListEmployeesResponse, Employee } from "tsg-shared";

const handler: Handler = logger => async event => {
  const { client, user } = await getUserClient(event, logger);

  const { userRole } = user;
  if (
    userRole !== UserRoles.AccountAdmin &&
    userRole !== UserRoles.SuperAdmin
  ) {
    logger.error(
      `The user record does sufficient permissions to list employees. User role: ${userRole}`
    );
    return Responses.forbidden({
      message: "You do not have sufficient permissions to list employees."
    });
  }

  const users = await dynamo
    .query({
      TableName: process.env.USER_TABLE,
      KeyConditionExpression: "clientId = :value0",
      ExpressionAttributeValues: {
        ":value0": client.id
      },
      Limit: 100
    })
    .promise();

  const response: ListEmployeesResponse = {
    data: users.Items as Array<Employee>,
    count: users.Count
  };

  return Responses.success(response);
};

export default withLogger(handler);
