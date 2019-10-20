import "source-map-support/register";

import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { ListCustomersResponse, Customer } from "tsg-shared";

const handler: Handler = logger => async event => {
  const { client } = await getUserClient(event, logger);

  const customers = await dynamo
    .scan({
      TableName: process.env.CUSTOMER_TABLE,
      ExpressionAttributeValues: {
        ":value0": client.id
      },
      FilterExpression: "clientId = :value0"
    })
    .promise();

  const response: ListCustomersResponse = {
    data: customers.Items as Array<Customer>,
    count: customers.Count
  };

  return Responses.success(response);
};

export default withLogger(handler);
