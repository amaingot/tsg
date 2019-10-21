import * as uuid from "uuid/v4";
import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import twilio from "../utils/twilio";
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

  const { lastName, firstName, email, cellPhone, userRole } = request.data;

  if (!lastName || !firstName || !email || !cellPhone || !userRole) {
    logger.error("Did not supply all of the required params");
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
    userRole,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  const newUser = await dynamo
    .put({
      TableName: process.env.USER_TABLE,
      Item: userData
    })
    .promise();

  const response: CreateEmployeeResponse = {
    data: newUser.Attributes as Employee
  };

  const message = await twilio.messages.create({
    body:
      `Hello from Tennis Shop Guru! ${user.firstName} at ${client.name}` +
      ` created you an account! Visit https://tsg.hmm.dev/login to setup your account.` +
      ` Your username is ${email} and your temporary password is ${tempPassword}`,
    to: cellPhone,
    from: process.env.TWILIO_PHONE_NUMBER
  });

  await dynamo
    .put({
      TableName: process.env.MESSAGE_TABLE,
      Item: {
        id: uuid(),
        employeeId: cognitoUserId,
        clientId: client.id,
        customerId: "n/a",
        ...message
      }
    })
    .promise();

  return Responses.success(response);
};

export default withLogger(handler);
