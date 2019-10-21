import "source-map-support/register";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import qs from "qs";
import { Customer, Employee, Client } from "tsg-shared";
import { twiml } from "twilio";

interface SMSIncomingRequest {
  ToCountry?: string;
  ToState?: string;
  SmsMessageSid?: string;
  NumMedia?: string;
  ToCity?: string;
  FromZip?: string;
  SmsSid?: string;
  FromState?: string;
  SmsStatus?: string;
  FromCity?: string;
  Body?: string;
  FromCountry?: string;
  To?: string;
  ToZip?: string;
  NumSegments?: string;
  MessageSid?: string;
  AccountSid?: string;
  From?: string;
  ApiVersion?: string;
}
const handler: Handler = logger => async event => {
  const request = qs.parse(event.body) as SMSIncomingRequest;

  logger.info(`SMS Reply Callback: ${request}`);

  const {
    ToCountry,
    ToState,
    SmsMessageSid,
    NumMedia,
    ToCity,
    FromZip,
    SmsSid,
    FromState,
    SmsStatus,
    FromCity,
    Body,
    FromCountry,
    To,
    ToZip,
    NumSegments,
    MessageSid,
    AccountSid,
    From,
    ApiVersion
  } = request;

  const s = {};

  if (typeof ToCountry === "string") s["toCountry"] = ToCountry;
  if (typeof ToState === "string") s["toState"] = ToState;
  if (typeof SmsMessageSid === "string") s["smsMessageSid"] = SmsMessageSid;
  if (typeof NumMedia === "string") s["numMedia"] = NumMedia;
  if (typeof ToCity === "string") s["toCity"] = ToCity;
  if (typeof FromZip === "string") s["fromZip"] = FromZip;
  if (typeof SmsSid === "string") s["smsSid"] = SmsSid;
  if (typeof FromState === "string") s["fromState"] = FromState;
  if (typeof SmsStatus === "string") {
    s["smsStatus"] = SmsStatus;
    s["status"] = SmsStatus;
  }
  if (typeof FromCity === "string") s["fromCity"] = FromCity;
  if (typeof Body === "string") s["body"] = Body;
  if (typeof FromCountry === "string") s["fromCountry"] = FromCountry;
  if (typeof To === "string") s["to"] = To;
  if (typeof ToZip === "string") s["toZip"] = ToZip;
  if (typeof NumSegments === "string") s["numSegments"] = NumSegments;
  if (typeof MessageSid === "string") {
    s["messageSid"] = MessageSid;
    s["sid"] = MessageSid;
    s["id"] = MessageSid;
  }
  if (typeof AccountSid === "string") s["accountSid"] = AccountSid;
  if (typeof From === "string") s["from"] = From;
  if (typeof ApiVersion === "string") s["apiVersion"] = ApiVersion;

  s["updatedAt"] = new Date().toISOString();
  s["createdAt"] = new Date().toISOString();

  let callbackNumber: string;

  const potentialCustomers = await dynamo
    .scan({
      TableName: process.env.CUSTOMER_TABLE,
      FilterExpression:
        "cellPhone = :from OR homePhone = :from OR workPhone = :from",
      ExpressionAttributeValues: {
        ":from": From
      }
    })
    .promise();

  if (potentialCustomers.Items.length > 0) {
    const customer = potentialCustomers.Items[0] as Customer;
    s["customerId"] = customer.id;
    s["clientId"] = customer.clientId;
    s["employeeId"] = "none";

    const clientRecord = await dynamo
      .get({
        TableName: process.env.CLIENT_TABLE,
        Key: { id: customer.clientId }
      })
      .promise();

    callbackNumber = (clientRecord.Item as Client).phone;
  } else {
    const potentialEmployees = await dynamo
      .scan({
        TableName: process.env.USER_TABLE,
        FilterExpression: "cellPhone = :from",
        ExpressionAttributeValues: {
          ":from": From
        }
      })
      .promise();
    if (potentialEmployees.Items.length > 0) {
      const employee = potentialEmployees.Items[0] as Employee;

      const clientRecord = await dynamo
        .get({
          TableName: process.env.CLIENT_TABLE,
          Key: { id: employee.clientId }
        })
        .promise();

      callbackNumber = (clientRecord.Item as Client).phone;
      s["employeeId"] = employee.id;
      s["clientId"] = employee.clientId;
      s["customerId"] = "none";
    } else {
      s["customerId"] = "none";
      s["clientId"] = "none";
      s["employeeId"] = "none";
    }
  }

  await dynamo
    .put({
      TableName: process.env.MESSAGE_TABLE,
      Item: s
    })
    .promise();

  const response = new twiml.MessagingResponse();

  response.message(
    `Hello! Sorry but we haven't set up our texting system, please call us. ${callbackNumber &&
      `Please call us at ${callbackNumber}`}`
  );

  return {
    statusCode: 200,
    body: response.toString(),
    headers: {
      "Content-Type": "text/xml"
    }
  };
};

export default withLogger(handler);
