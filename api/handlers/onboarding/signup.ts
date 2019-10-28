import * as uuid from "uuid/v4";
import "source-map-support/register";
import { SignUpRequest, UserRoles, Client, Employee } from "tsg-shared";

import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import { createUser, UserRecord, disableUser } from "../utils/cognito";
import Stripe from "../utils/stripe";
import { sendConfirmEmail } from "../utils/sendgrid";
import generateRandomString from "../utils/generateRandomString";

const handler: Handler = logger => async event => {
  const signUpRequest: Partial<SignUpRequest> = JSON.parse(event.body);

  logger.info("Creating a new user signup because of this event: ", event);

  const {
    email,
    password,
    firstName,
    lastName,
    companyName,
    cellPhone,
    workPhone
  } = signUpRequest;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !companyName ||
    !cellPhone ||
    !workPhone
  ) {
    logger.error("Bad signup request", signUpRequest);
    return Responses.badRequest();
  }

  let newCognitoUser: UserRecord;

  try {
    newCognitoUser = await createUser(
      {
        email,
        lastName,
        firstName,
        phoneNumber: cellPhone
      },
      password
    );
  } catch (e) {
    logger.error("Error when getting newly signed up user", e);
    return Responses.internalError(e);
  }
  const { id: cognitoUserId } = newCognitoUser;

  try {
    await disableUser(cognitoUserId);
  } catch (e) {
    logger.error(e);
    return Responses.badRequest(e);
  }

  let stripeCustomerId: string;

  try {
    const stripeCustomer = await Stripe().customers.create({
      name: companyName,
      email: email,
      phone: workPhone
    });
    stripeCustomerId = stripeCustomer.id;
  } catch (e) {
    logger.error("Error when creating stripe customer", e);
    return Responses.internalError(e);
  }

  const newClient: Client = {
    id: uuid(),
    name: companyName,
    phone: workPhone,
    stripeCustomerId,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  try {
    await dynamo
      .put({
        TableName: process.env.CLIENT_TABLE,
        Item: newClient
      })
      .promise();
  } catch (e) {
    logger.error("Error creating a client in the client table", e);
    return Responses.internalError(e);
  }

  const newUser: Employee = {
    id: cognitoUserId,
    clientId: newClient.id,
    email,
    firstName,
    lastName,
    cellPhone,
    userRole: UserRoles.AccountAdmin,
    confirmAccountCode: generateRandomString(24),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  try {
    await dynamo
      .put({
        TableName: process.env.USER_TABLE,
        Item: newUser
      })
      .promise();
  } catch (e) {
    logger.error("Error creating user record", e);
    return Responses.internalError(e);
  }

  const confirmAccountLink = `https://${process.env.APP_HOST}/sign-up/confirm?id=${cognitoUserId}&code=${newUser.confirmAccountCode}`;

  await sendConfirmEmail(email, confirmAccountLink);

  return Responses.success({
    userId: newUser.id,
    clientId: newClient.id
  });
};

export default withLogger(handler);
