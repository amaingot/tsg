import { Employee, Client } from "tsg-shared";
import getClient from "./getClient";
import getUser from "./getUser";
import * as winston from "winston";
import { APIGatewayEvent } from "aws-lambda";

interface Result {
  user: Employee;
  client: Client;
}

const getUserClient = async (
  event: APIGatewayEvent,
  logger: winston.Logger
): Promise<Result> => {
  const userId = event.requestContext.authorizer.claims["cognito:username"];

  if (!userId) {
    logger.error("No user claim in event");
    throw new Error("No user");
  }
  let user: Employee;
  let client: Client;
  try {
    user = await getUser(userId);
  } catch (e) {
    logger.error(`Error fetching a user record. Cognito User ID: ${userId}`);
    throw e;
  }

  if (user === undefined) {
    logger.error(
      `User record does not exist in dynamo DB. Cognito user id: ${userId}`
    );
    throw new Error(`User record does not exist in dynamo DB.`);
  }

  try {
    client = await getClient(user.clientId);
  } catch (e) {
    logger.error(`Error fetching a client record. Client ID: ${user.clientId}`);
    throw e;
  }

  return { user, client };
};
export default getUserClient;
