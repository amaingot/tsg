import { getRepository } from "typeorm";
import { UserInputError } from "apollo-server-express";

import { MutationResolvers } from "../types";
import * as DB from "../../db";

export const login: Required<MutationResolvers>["login"] = async (
  _parent,
  { input },
  context
) => {
  context.isAnonymous();

  const { email, password } = input;

  const user = await getRepository(DB.User).findOne({ email });
  const isCorrectPassword = (await user?.isCorrectPassword(password)) || false;

  if (!user || !isCorrectPassword) {
    throw new UserInputError("Invalid email / password combination");
  }

  const token = user.createUserToken();
  const employee = await getRepository(DB.Employee).findOne({ email });

  return {
    token,
    employeeId: employee?.id,
    userId: user.id,
  };
};

export const forgotPassword: Required<MutationResolvers>["forgotPassword"] = async (
  _parent,
  { input },
  context
) => {
  context.isAnonymous();
  const { email } = input;

  const user = await getRepository(DB.User).findOne({ email });

  if (!user) {
    return {
      success: false,
      error: {
        code: "EMAIL_NOT_FOUND",
        message: "Could not find a user with that email",
      },
    };
  }

  user.createPasswordResetCode();
  await user.save();

  return {
    success: true,
  };
};

export const resetPassword: Required<MutationResolvers>["resetPassword"] = async (
  _parent,
  { input },
  context
) => {
  context.isAnonymous();
  const { email, code, newPassword } = input;

  const user = await getRepository(DB.User).findOne({ email });
  if (!user) {
    throw new UserInputError(
      "Could not find a user with the supplied email address"
    );
  }

  if (user.isPasswordResetCodeValid(code) !== "VALID") {
    throw new UserInputError("Password reset code is not valid");
  }

  await user.encryptPassword(newPassword);
  await user.save();

  const token = user.createUserToken();
  // TODO: Set user token with res.cookie(token, {...tokenOptions})

  const employee = await getRepository(DB.Employee).findOne({ email });

  return {
    token,
    employeeId: employee?.id,
    userId: user.id,
  };
};
