import { Client } from "tsg-shared";
import dynamo from "./dynamo";

const getClient = async (clientId: string): Promise<Client> => {
  const clientRecord = await dynamo
    .get({
      TableName: process.env.CLIENT_TABLE,
      Key: {
        id: clientId
      }
    })
    .promise();

  const client = clientRecord.Item as Client;
  return client;
};
export default getClient;
