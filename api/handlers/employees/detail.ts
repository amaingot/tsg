import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { Employee, UserRoles, GetEmployeeResponse } from "tsg-shared";

const handler: Handler = logger => async event => {
  const recordId = event.pathParameters.id;

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

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

  const userRecord = await dynamo
    .get({
      TableName: process.env.USER_TABLE,
      Key: {
        id: recordId
      }
    })
    .promise();

  const employee = userRecord.Item as Employee;

  if (employee.clientId !== client.id) {
    logger.info("User is accessing something they do not have access to");
    return Responses.forbidden();
  }

  const response: GetEmployeeResponse = {
    data: employee
  };

  return Responses.success(response);
};

export default withLogger(handler);
