import * as uuid from "uuid/v4";
import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { signUpUser, UserRecord, getUser } from "../utils/cognito";
import {
  UserRoles,
  Employee,
  CreateEmployeeRequest,
  CreateEmployeeResponse
} from "tsg-shared";

const handler: Handler = logger => async event => {
  const request = JSON.parse(event.body) as CreateEmployeeRequest;

  const { firstName, lastName, email, cellPhone } = request.data;

  if (!firstName || !lastName || !cellPhone || !email) {
    logger.error("No firstName and/or lastName provided");
    return Responses.badRequest();
  }
  const { client, user } = await getUserClient(event, logger);

  if (!user.clientId) {
    logger.error(
      `The user record does not have a client. User Record: ${user}`
    );
    return Responses.internalError({
      message: "The user does not have a client"
    });
  }

  const { userRole } = user;
  if (
    userRole !== UserRoles.AccountAdmin &&
    userRole !== UserRoles.SuperAdmin
  ) {
    logger.error(
      `The user record does sufficient permissions to create a user. User role: ${userRole}`
    );
    return Responses.forbidden({
      message: "You do not have sufficient permissions to create a user."
    });
  }

  const tempPassword = uuid();

  try {
    await signUpUser({
      email,
      password: tempPassword,
      lastName,
      firstName,
      phoneNumber: cellPhone
    });
  } catch (e) {
    logger.error("Error when signing up user", e);
    return Responses.internalError(e);
  }

  let newCognitoUser: UserRecord;

  try {
    newCognitoUser = await getUser(email);
    logger.info("Cognito user created: ", newCognitoUser);
  } catch (e) {
    logger.error("Error when getting newly signed up user", e);
    return Responses.internalError(e);
  }
  const { id: cognitoUserId } = newCognitoUser;

  const userData: Employee = {
    id: cognitoUserId,
    clientId: client.id,
    firstName,
    lastName,
    email,
    cellPhone,
    userRole: UserRoles.Employee,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  const newUser = await dynamo
    .put({
      TableName: process.env.CUSTOMER_TABLE,
      Item: userData
    })
    .promise();

  const response: CreateEmployeeResponse = {
    data: newUser.Attributes as Employee
  };

  return Responses.success(response);
};

export default withLogger(handler);
