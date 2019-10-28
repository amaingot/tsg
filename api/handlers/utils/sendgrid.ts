import sendgrid from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";

export const sendEmail = async (params: Partial<MailData>) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  const request: MailData = {
    from: {
      name: "Tennis Shop Guru",
      email: "theguru@tennisshop.guru"
    },
    replyTo: "alex@tennisshop.guru",
    ...params
  };

  return sendgrid.send(request);
};

export const sendConfirmEmail = async (email: string, link: string) => {
  return sendEmail({
    subject: "Welcome to Tennis Shop Guru",
    to: email,
    html: `<div>Click this <a href="${link}">link</a> to get started in Tennis Shop Guru!</div>`
  });
};

export const sendForgotPasswordEmail = async (email: string, link: string) => {
  return sendEmail({
    subject: "Tennis Shop Guru Password Reset",
    to: email,
    html: `<div>Click this <a href="${link}">link</a> to reset your password in Tennis Shop Guru!</div>`
  });
};
