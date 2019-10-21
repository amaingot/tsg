import Twilio from "twilio";
import dynamo from "./dynamo";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = Twilio(accountSid, authToken);

export default client;

interface SendMessageParams {
  clientId: string;
  customerId: string;
  employeeId: string;
  body: string;
  to: string;
}

export const sendMessage = async (params: SendMessageParams) => {
  const { clientId, customerId, employeeId, body, to } = params;

  const message = await client.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
    statusCallback: "https://tsg-api.hmm.dev/sms/status"
  });

  const newMessageRecord = {
    id: message.sid,
    employeeId,
    clientId,
    customerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  Object.keys(message).forEach(k => {
    if (
      message[k] &&
      message[k] !== null &&
      typeof message[k] !== "object" &&
      typeof message[k] !== "function" &&
      typeof message[k] !== "undefined"
    ) {
      newMessageRecord[k] = message[k];
    }
  });

  await dynamo
    .put({
      TableName: process.env.MESSAGE_TABLE,
      Item: newMessageRecord
    })
    .promise();
};
