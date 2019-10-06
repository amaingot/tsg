import { APIGatewayProxyHandler } from "aws-lambda";
import uuid from "uuid/v4";
import "source-map-support/register";
import { SignUpRequest, UserRoles } from "tsg-shared";

import * as Responses from "./utils/responses";
import dynamo from "./utils/dynamo";
import withRollbar from "./utils/withRollbar";
import { signUpUser, getUser } from "./utils/cognito";

const handler: APIGatewayProxyHandler = async (event, _context) => {
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

  await signUpUser({
    email,
    password,
    lastName,
    firstName,
    phoneNumber: cellPhone
  });

  const newCognitoUser = await getUser(email);
  console.log("Cognito user created: ", newCognitoUser);
  const { id: cognitoUserId } = newCognitoUser;

  const newClient = await dynamo
    .put({
      TableName: process.env.CLIENT_TABLE,
      Item: {
        id: uuid(),
        name: companyName,
        phone: workPhone,
        updatedAt: new Date().toISOString,
        createdAt: new Date().toISOString
      }
    })
    .promise();

  console.log("Created client record: ", newClient);

  const newUserRecord = await dynamo
    .put({
      TableName: process.env.USER_TABLE,
      Item: {
        id: cognitoUserId,
        clientId: newClient.Attributes.id,
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

  console.log("Created user record: ", newUserRecord);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        userId: newUserRecord.Attributes.id,
        clientId: newClient.Attributes.id,
        cognitoId: cognitoUserId
      },
      null,
      2
    )
  };
};

export default withRollbar(handler);
