import { Request, Response } from "express";
import admin from "firebase-admin";
import { UserRole } from "../db/entities/Employee";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import auth from "../utils/auth";
import { logger } from "../utils/logger";

interface CurrentUser {
  employeeId?: string;
  clientId?: string;
  userRole: UserRole;
}

export class GraphqlContext {
  public readonly req: Request;
  public readonly res: Response;

  private decodedToken: admin.auth.DecodedIdToken | undefined;
  private _currentUser: CurrentUser | undefined;

  constructor(expressContext: ExpressContext) {
    const { req, res } = expressContext;
    this.req = req;
    this.res = res;
    this._currentUser = undefined;
  }

  async parseToken() {
    const rawToken = this.req.header("Authorization");

    if (rawToken) {
      try {
        this.decodedToken = await auth.verifyIdToken(rawToken);
      } catch (e) {
        logger.error("Invalid auth token", {
          req: this.req,
          res: this.res,
          rawToken,
        });
      }
    }
  }

  public get token() {
    return this.decodedToken;
  }

  public get currentUser() {
    return this._currentUser;
  }
}
