import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { sendMessage } from "../utils/twilio";
import getUserClient from "../utils/getUserClient";
import { UserRecord, createUser, disableUser } from "../utils/cognito";
import {
  UserRoles,
  Employee,
  CreateEmployeeRequest,
  CreateEmployeeResponse
} from "tsg-shared";
import { sendConfirmEmail } from "../utils/sendgrid";
import generateRandomString from "../utils/generateRandomString";

const handler: Handler = logger => async event => {
  const request = JSON.parse(event.body) as CreateEmployeeRequest;

  const { lastName, firstName, email, cellPhone, userRole } = request.data;

  if (!lastName || !firstName || !email || !cellPhone || !userRole) {
    logger.error("Did not supply all of the required params");
    return Responses.badRequest();
  }

  const { client, user } = await getUserClient(event, logger);

  if (
    user.userRole !== UserRoles.AccountAdmin &&
    user.userRole !== UserRoles.SuperAdmin
  ) {
    logger.error(
      `The user record does sufficient permissions to create a user. User role: ${userRole}`
    );
    return Responses.forbidden({
      message: "You do not have sufficient permissions to create a user."
    });
  }

  let newCognitoUser: UserRecord;

  try {
    newCognitoUser = await createUser({
      email,
      lastName,
      firstName,
      phoneNumber: cellPhone
    });
    await disableUser(newCognitoUser.id);
  } catch (e) {
    logger.error("Error when creating user", e);
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
    userRole,
    confirmAccountCode: generateRandomString(24),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  await dynamo
    .put({
      TableName: process.env.USER_TABLE,
      Item: userData
    })
    .promise();

  const response: CreateEmployeeResponse = {
    data: userData
  };

  const acceptInvitationLink = `${event.headers["Origin"]}/accept-invitation?id=${userData.id}&code=${userData.confirmAccountCode}`;
  await sendConfirmEmail(email, acceptInvitationLink);

  await sendMessage({
    body:
      `Hello from Tennis Shop Guru! ${user.firstName} at ${client.name} ` +
      `created you an account! Check your email inbox for a welcome email. ` +
      `It may have gone to spam, so check there too! Your username for TSG is ${email}`,
    to: cellPhone,
    employeeId: cognitoUserId,
    clientId: client.id,
    customerId: "none"
  });

  return Responses.success(response);
};

export default withLogger(handler);
