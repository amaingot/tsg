import { Request, Response } from "express";
import admin from "firebase-admin";
import { UserRole } from "../db/entities/Employee";

export interface GraphqlContext {
  req: Request;
  res: Response;
  token?: admin.auth.DecodedIdToken;
  currentUser?: {
    employeeId?: string;
    clientId?: string;
    userRole?: UserRole;
  };
}
