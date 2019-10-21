import "source-map-support/register";

import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { ListCustomersResponse, Customer } from "tsg-shared";

const handler: Handler = logger => async event => {
  const { client } = await getUserClient(event, logger);

  const customers = await dynamo
    .query({
      TableName: process.env.CUSTOMER_TABLE,
      IndexName: "CustomerClients",
      KeyConditionExpression: "clientId = :clientId",
      ExpressionAttributeValues: {
        ":clientId": client.id
      }
    })
    .promise();

  const response: ListCustomersResponse = {
    data: customers.Items as Array<Customer>,
    count: customers.Count
  };

  return Responses.success(response);
};

export default withLogger(handler);
