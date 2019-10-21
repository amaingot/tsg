import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import dynamoUpdateExp from "../utils/dynamoUpdateExp";
import qs from "qs";

/*
SmsSid: SMda94909b8eb34cd98f6897c47aa8f685
SmsStatus: sent
MessageStatus: sent
To: +13618159979
MessageSid: SMda94909b8eb34cd98f6897c47aa8f685
AccountSid: AC1af84e94bd4a4e832ef0a33287a32b81
From: +16503000096
ApiVersion: 2010-04-01
*/

interface SMSStatusRequest {
  SmsSid: string;
  SmsStatus: string;
  MessageStatus: string;
  To: string;
  MessageSid: string;
  AccountSid: string;
  From: string;
  ApiVersion: string;
}
const handler: Handler = logger => async event => {
  const request = qs.parse(event.body) as SMSStatusRequest;

  logger.info(`SMS Status Callback: ${request}`);

  const smsRecord = await dynamo
    .get({
      TableName: process.env.MESSAGE_TABLE,
      Key: {
        id: request.MessageSid
      }
    })
    .promise();

  const updatedSmsRecord = { ...smsRecord.Item };

  updatedSmsRecord["updatedAt"] = new Date().toISOString();
  updatedSmsRecord["status"] = request.SmsStatus;
  updatedSmsRecord[`${request.SmsStatus}At`] = new Date().toISOString();

  const updateExpression = dynamoUpdateExp(smsRecord.Item, updatedSmsRecord);
  logger.info(`SMS Status Update: ${updateExpression}`);

  await dynamo
    .update({
      TableName: process.env.MESSAGE_TABLE,
      Key: {
        id: request.MessageSid
      },
      ...updateExpression
    })
    .promise();

  return Responses.success();
};

export default withLogger(handler);
