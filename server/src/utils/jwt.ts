import jwt from "jsonwebtoken";
import {
  AccountStatus,
  AccountType,
  EmployeeType,
  UserType,
} from "../graphql/types";
import config from "./config";

export interface Claims {
  userId: string;
  userType: UserType;
  employeeId?: string;
  employeeType?: EmployeeType;
  workspace?: string;
  accountId?: string;
  accountType?: AccountType;
  accountStatus?: AccountStatus;
}

interface DecodedToken {
  sub: string;
  exp?: number;
  claims: Claims;
}

export const createToken = async (claims: Claims) => {
  const decodedToken: DecodedToken = { sub: claims.userId, claims };
  return jwt.sign(decodedToken, config.get("JWT_SECRET"), {
    expiresIn: "7d",
  });
};

export const decodeToken = async (token: string) => {
  try {
    return jwt.verify(token, config.get("JWT_SECRET")) as DecodedToken;
  } catch (e) {
    return undefined;
  }
};
