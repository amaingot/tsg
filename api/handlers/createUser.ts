import uuid from "uuid/v4";
import "source-map-support/register";
import * as Responses from "./utils/responses";
import dynamo from "./utils/dynamo";
import withLogger, { Handler } from "./utils/withLogger";
import { signUpUser, UserRecord, getUser } from "./utils/cognito";
import { UserRoles } from "tsg-shared";

const handler: Handler = logger => async event => {
  const { email: userEmail } = event.requestContext.authorizer.claims;
  const request = JSON.parse(event.body);

  logger.info("Creating a new customer because of this event: ", event);

  const { firstName, lastName, email, cellPhone } = request;

  if (!firstName || !lastName || !cellPhone || !email) {
    logger.error("No firstName and/or lastName provided");
    return Responses.badRequest();
  }

  if (!userEmail) {
    logger.error("No user claim in event");
    return Responses.forbidden();
  }

  logger.info("Creating customer for: " + userEmail);

  const userAttributes = await getUser(userEmail);

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
    logger.error(
      `The user does not have a user record. Cognito User: ${userAttributes}`
    );
    return Responses.internalError({
      message: "The user does not have a user record"
    });
  }

  if (!userRecord.Item.clientId) {
    logger.error(
      `The user record does not have a client. User Record: ${userRecord}`
    );
    return Responses.internalError({
      message: "The user does not have a client"
    });
  }

  const { userRole } = userRecord.Item;
  if (
    userRole !== UserRoles.AccountAdmin ||
    userRole !== UserRoles.SuperAdmin
  ) {
    logger.error(
      `The user record does sufficient permissions to create a user. User role: ${userRole}`
    );
    return Responses.forbidden({
      message: "You do not have sufficient permissions to create a user."
    });
  }

  logger.info(`Fetched user record: ${userRecord}`);

  const clientRecord = await dynamo
    .get({
      TableName: process.env.CLIENT_TABLE,
      Key: {
        id: userRecord.Item.clientId
      }
    })
    .promise();

  if (!clientRecord) {
    logger.error(
      `The client record does not exist. User Record: ${userRecord}`
    );
    return Responses.internalError({
      message: "The user does not have a user record"
    });
  }

  logger.info(`Fetched client record: ${clientRecord}`);

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

  const newUser = await dynamo
    .put({
      TableName: process.env.CUSTOMER_TABLE,
      Item: {
        id: cognitoUserId,
        clientId: clientRecord.Item.id,
        firstName,
        lastName,
        email,
        cellPhone,
        userRole: UserRoles.Employee,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    })
    .promise();

  return Responses.success({
    data: { ...newUser.Attributes }
  });
};

export default withLogger(handler);
