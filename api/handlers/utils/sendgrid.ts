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

export const sendConfirmEmail = async (email: string, code: string) => {
  return sendEmail({
    subject: "Welcome to Tennis Shop Guru",
    to: email,
    html: `
      <div>
        <h2>Welcome to Tennis Shop Guru!</h2>
        <p> Click <a href="https://tennisshop.guru/login?code=${code}">this link</a> to get started</p>
      </div>
    `
  });
};

export const sendForgotPasswordEmail = async (email: string, code: string) => {
  return sendEmail({
    subject: "Tennis Shop Guru Password Reset",
    to: email,
    html: `
      <div>
        <h2>Reset your TSG Account!</h2>
        <p> Click <a href="https://tennisshop.guru/reset-password?code=${code}">this link</a> change your password!</p>
      </div>
    `
  });
};
