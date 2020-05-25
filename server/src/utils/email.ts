import sendgrid from "@sendgrid/mail";
import config from "./config";

const SENDER_EMAIL = config.get("SENDER_EMAIL");

sendgrid.setApiKey(config.get("SENDGRID_API_KEY"));

export const sendSignUpEmail = async (email: string) => {
  const msg = {
    to: email,
    from: SENDER_EMAIL,
    subject: "Welcome to the chores app!",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  const [response] = await sendgrid.send(msg);

  return response.statusCode === 200;
};
