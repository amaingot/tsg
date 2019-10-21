import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";
import {
  GetEmployeeResponse,
  Employee,
  UpdateEmployeeRequest
} from "tsg-shared";

const handler: Handler = logger => async event => {
  const request = JSON.parse(event.body) as UpdateEmployeeRequest;

  logger.info("Updating employee because of this event: ", event);

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const recordId = event.pathParameters.id;

  const { lastName, firstName, email, cellPhone, userRole } = request.data;

  if (!lastName || !firstName || !email || !cellPhone || !userRole) {
    logger.error("Did not supply all of the required params");
    return Responses.badRequest();
  }

  const { client } = await getUserClient(event, logger);

  const customerRecord = await dynamo
    .get({
      TableName: process.env.USER_TABLE,
      Key: {
        id: recordId
      }
    })
    .promise();

  const employee = customerRecord.Item as Employee;

  if (employee.clientId !== client.id) {
    logger.info("User is updating something they do not have access to");
    return Responses.forbidden();
  }

  const updatedEmployee: Employee = {
    id: recordId,
    lastName,
    firstName,
    email,
    cellPhone,
    userRole,
    clientId: client.id,
    updatedAt: new Date().toISOString(),
    createdAt: employee.createdAt
  };

  const updateExpression = dynamoUpdateExp(employee, updatedEmployee);

  const updatedEmployeeRecord = await dynamo
    .update({
      TableName: process.env.USER_TABLE,
      Key: {
        id: recordId
      },
      ...updateExpression
    })
    .promise();

  const response: GetEmployeeResponse = {
    data: updatedEmployeeRecord.Attributes as Employee
  };

  return Responses.success(response);
};

export default withLogger(handler);
