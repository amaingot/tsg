import crypto from "crypto";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

const PASSWORD_HASH_ROUNDS = 10;

// Password reset codes only last one hour
const PASSWORD_RESET_CODE_TTL = 1000 * 60 * 60;

export const verifyPassword = (
  user: User,
  plainTextPassword: string
): Promise<boolean> => bcrypt.compare(plainTextPassword, user.passwordHash);

export const encryptPassword = (plainTextPassword: string) =>
  bcrypt.hash(plainTextPassword, PASSWORD_HASH_ROUNDS);

export const createPasswordResetCode = () => {
  const passwordResetCode = crypto.randomInt(999999);
  const passwordResetCodeExpiration = new Date(
    Date.now() + PASSWORD_RESET_CODE_TTL
  );
  return {
    passwordResetCode,
    passwordResetCodeExpiration,
  };
};

export const isPasswordResetCodeValid = (user: User, code: number) => {
  if (!user.passwordResetCode || !user.passwordResetCodeExpiration) {
    return "NO_CODE";
  }

  if (Date.now() > user.passwordResetCodeExpiration.getUTCMilliseconds()) {
    return "CODE_EXPIRED";
  }

  if (code !== user.passwordResetCode) {
    return "INCORRECT_CODE";
  }

  return "VALID";
};

export const createUserToken = (user: User) => {
  return "some-token";
};
