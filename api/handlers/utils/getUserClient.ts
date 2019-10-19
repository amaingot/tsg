import { User, Client } from "tsg-shared";
import getClient from "./getClient";
import getUser from "./getUser";
import * as winston from "winston";
import { APIGatewayEvent } from "aws-lambda";

interface Result {
  user: User;
  client: Client;
}

const getUserClient = async (
  event: APIGatewayEvent,
  logger: winston.Logger
): Promise<Result> => {
  const userId = event.requestContext.authorizer.claims["cognito:username"];

  logger.info("Fetching auth info becasue of this request: ", event);

  if (!userId) {
    logger.error("No user claim in event");
    throw new Error('No user');
  }
  let user: User;
  let client: Client;
  try {
    user = await getUser(userId);
  } catch (e) {
    logger.error(`Error fetching a user record. Cognito User ID: ${userId}`);
    throw e;
  }

  try {
    client = await getClient(user.clientId);
  } catch (e) {
    logger.error(`Error fetching a client record. Client ID: ${user.clientId}`);
  }

  return { user, client };
};
export default getUserClient;
