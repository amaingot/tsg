import AWSXray from "aws-xray-sdk-core";
import * as AWS from "aws-sdk";

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  };
}

const ddbClient = AWSXray.captureAWSClient(new AWS.DynamoDB(options));

const client = new AWS.DynamoDB.DocumentClient({
  service: ddbClient
});

export default client;
