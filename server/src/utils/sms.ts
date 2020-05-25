import Twilio from "twilio";
import config from "./config";

const client = Twilio(
  config.get("TWILIO_ACCOUNT_SID"),
  config.get("TWILIO_AUTH_TOKEN")
);

interface SendMessageParams {
  to: string;
  body: string;
}

export const sendMessage = (params: SendMessageParams) => {
  return client.messages.create({
    ...params,
    from: config.get("TWILIO_PHONE_NUMBER"),
  });
};
