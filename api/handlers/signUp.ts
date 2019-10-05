import { APIGatewayProxyHandler } from "aws-lambda";
import uuid from "uuid/v4";
import "source-map-support/register";
import { SignUpRequest, UserRoles } from "tsg-shared";

import * as Responses from "./utils/responses";
import dynamo from "./utils/dynamo";
import withLogger from "./utils/withLogger";
import { signUpUser, getUserAttributes } from "./utils/cognito";

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

  const cognitoUser = await signUpUser({
    email,
    password,
    lastName,
    firstName,
    phoneNumber: cellPhone
  });

  const { id: cognitoUserId } = await getUserAttributes(cognitoUser);

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

  const newUser = await dynamo
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

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        userId: newUser.Attributes.id,
        clientId: newClient.Attributes.id,
        cognitoId: cognitoUserId
      },
      null,
      2
    )
  };
};

export default withLogger(handler);
