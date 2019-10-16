import { APIGatewayProxyResult } from "aws-lambda";

const headers = {
  "Access-Control-Allow-Origin": "https://tsg.hmm.dev",
  "Access-Control-Allow-Credentials": true
};

export const badRequest = (body?: Object): APIGatewayProxyResult => ({
  statusCode: 400,
  headers,
  body: JSON.stringify(body)
});

export const success = (body?: object): APIGatewayProxyResult => ({
  statusCode: 200,
  headers,
  body: JSON.stringify(body)
});

export const forbidden = (body?: object): APIGatewayProxyResult => ({
  statusCode: 403,
  headers,
  body: JSON.stringify(body)
});

export const internalError = (body?: object): APIGatewayProxyResult => ({
  statusCode: 500,
  headers,
  body: JSON.stringify(body)
});
