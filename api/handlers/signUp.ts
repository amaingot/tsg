import uuid from "uuid/v4";
import "source-map-support/register";
import { SignUpRequest, UserRoles } from "tsg-shared";

import * as Responses from "./utils/responses";
import dynamo from "./utils/dynamo";
import withLogger, { Handler } from "./utils/withLogger";
import { signUpUser, getUser, UserRecord } from "./utils/cognito";

const handler: Handler = logger => async event => {
  const signUpRequest: Partial<SignUpRequest> = JSON.parse(event.body);

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
    return Responses.badRequest();
  }

  try {
    await signUpUser({
      email,
      password,
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
    logger.error("Error when signing up user", e);
    return Responses.internalError(e);
  }
  const { id: cognitoUserId } = newCognitoUser;

  const newClientId = uuid();

  try {
    const newClient = await dynamo
      .put({
        TableName: process.env.CLIENT_TABLE,
        Item: {
          id: newClientId,
          name: companyName,
          phone: workPhone,
          updatedAt: new Date().toISOString,
          createdAt: new Date().toISOString
        }
      })
      .promise();
    logger.info("Created client record: ", newClient);
  } catch (e) {
    logger.error("Error creating a client in the client table", e);
    return Responses.internalError(e);
  }

  try {
    const newUserRecord = await dynamo
      .put({
        TableName: process.env.USER_TABLE,
        Item: {
          id: cognitoUserId,
          clientId: newClientId,
          email,
          firstName,
          lastName,
          cellPhone,
          userRole: UserRoles.AccountAdmin,
          updatedAt: new Date().toISOString,
          createdAt: new Date().toISOString
        }
      })
      .promise();
    logger.info("Created user record: ", newUserRecord);
  } catch (e) {
    logger.error("Error creating user record", e);
    return Responses.internalError(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        userId: cognitoUserId,
        clientId: newClientId
      },
      null,
      2
    )
  };
};

export default withLogger(handler);
