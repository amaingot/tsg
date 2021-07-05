import { UserInputError } from "apollo-server-express";

import { MutationResolvers } from "../types";
import { DB } from "../../db";
import {
  createPasswordResetCode,
  createUserToken,
  encryptPassword,
  isPasswordResetCodeValid,
  verifyPassword,
} from "../../utils/auth";

export const login: Required<MutationResolvers>["login"] = async (
  _parent,
  { input },
  context
) => {
  context.isAnonymous();

  const { email, password } = input;

  const user = await DB.user.findUnique({ where: { email } });
  if (!user) {
    throw new UserInputError("Invalid email / password combination");
  }

  const isCorrectPassword = (await verifyPassword(user, password)) || false;
  if (!isCorrectPassword) {
    throw new UserInputError("Invalid email / password combination");
  }

  const token = createUserToken(user);
  const employee = await getRepository(DB.Employee).findOne({ email });

  if (!employee) {
    throw new Error("User is not linked to an employee");
  }

  return {
    token,
    me: {
      employeeId: employee.id,
      userId: user.id,
      accountId: employee.accountId,
    },
  };
};

export const forgotPassword: Required<MutationResolvers>["forgotPassword"] = async (
  _parent,
  { input },
  context
) => {
  context.isAnonymous();
  const { email } = input;

  const user = await DB.user.findUnique({ where: { email } });

  if (!user) {
    return {
      success: false,
      error: {
        code: "EMAIL_NOT_FOUND",
        message: "Could not find a user with that email",
      },
    };
  }

  const resetCode = createPasswordResetCode();

  await DB.user.update({
    where: { id: user.id },
    data: {
      ...resetCode,
      updatedAt: new Date(),
    },
  });

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

  const user = await DB.user.findUnique({ where: { email } });
  if (!user) {
    throw new UserInputError(
      "Could not find a user with the supplied email address"
    );
  }

  if (isPasswordResetCodeValid(user, code) !== "VALID") {
    throw new UserInputError("Password reset code is not valid");
  }

  const passwordHash = await encryptPassword(newPassword);

  await DB.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash,
      updatedAt: new Date(),
    },
  });

  const token = createUserToken(user);
  // TODO: Set user token with res.cookie(token, {...tokenOptions})

  const employee = await DB.employee.findUnique({
    where: {
      email
    },
  });

  if (!employee) {
    throw new Error("User is not linked to an employee");
  }

  return {
    token,
    me: {
      employeeId: employee.id,
      userId: user.id,
      accountId: employee.accountId,
    },
  };
};
