import AWSXray from "aws-xray-sdk-core";
import * as AWS_SDK from "aws-sdk";
const AWS = process.env.DISABLE_XRAY ? AWS_SDK : AWSXray.captureAWS(AWS_SDK);

let options = {};

if (process.env.IS_OFFLINE && process.env.LOCAL_DYNAMO) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  };
}

const ddbClient: AWS_SDK.DynamoDB = process.env.DISABLE_XRAY
  ? new AWS.DynamoDB(options)
  : AWSXray.captureAWSClient(new AWS.DynamoDB(options));

const client: AWS_SDK.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(
  {
    service: ddbClient
  }
);

export default client;
