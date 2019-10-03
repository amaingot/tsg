import { APIGatewayProxyHandler } from 'aws-lambda';
import uuid from 'uuid/v4';

import dynamo from './utils/dynamo';
import withRollbar from './utils/withRollbar';

const handler: APIGatewayProxyHandler = async (event, _context) => {
  const newClient = await dynamo.put({
    TableName: process.env.CLIENT_TABLE,
    Item: {
      id: uuid(),
      name: 'It worked',
      updatedAt: (new Date()).toISOString,
      createdAt: (new Date()).toISOString,
    }
  }).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      input: event,
      env: {
        ...process.env
      },
      createdItem: {
        ...newClient.Attributes,
      }
    }, null, 2),
  };
};

export default withRollbar(handler);