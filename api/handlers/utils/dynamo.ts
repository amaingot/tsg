import AWSXray from "aws-xray-sdk-core";
import * as AWS_SDK from "aws-sdk";
const AWS = AWSXray.captureAWS(AWS_SDK);

let options = {};

if (process.env.IS_OFFLINE && process.env.LOCAL_DYNAMO) {
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
