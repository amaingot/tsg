import WebSocket from "ws";
import Cookie from "cookie";
import { Request, Response } from "express";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { ForbiddenError } from "apollo-server-express";
import { getRepository } from "typeorm";

import * as DB from "../db";
import config from "../utils/config";
import { Claims, createToken, decodeToken } from "../utils/jwt";

interface GraphqlContextParams {
  expressContext?: ExpressContext;
  websocket?: WebSocket;
  claims?: Claims;
}

export class GraphqlContext {
  public readonly req?: Request;
  public readonly res?: Response;
  public readonly websocket?: WebSocket;

  public readonly claims?: Claims;

  constructor(params: GraphqlContextParams) {
    const { req, res } = params.expressContext || {};
    this.req = req as any;
    this.res = res as any;
    this.websocket = params.websocket;
    this.claims = params.claims;
  }

  public async getCurrentUser() {
    const user =
      this.claims && (await getRepository(DB.User).findOne(this.claims.userId));

    if (!user) {
      throw new ForbiddenError("Not logged in");
    }

    return user;
  }

  public async getCurrentEmployee() {
    const employee =
      this.claims?.employeeId &&
      (await getRepository(DB.Employee).findOne(this.claims.employeeId));

    if (!employee) {
      throw new ForbiddenError("No employee present");
    }

    return employee;
  }

  public async getCurrentAccount() {
    const account =
      this.claims?.accountId &&
      (await getRepository(DB.Account).findOne(this.claims.accountId));

    if (!account) {
      throw new ForbiddenError("No account present");
    }

    return account;
  }

  public async setCookie(claims: Claims) {
    const token = await createToken(claims);

    this.res?.cookie(config.get("COOKIE_KEY"), token, {
      signed: true,
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      sameSite: "strict",
    });
  }

  static async fromHttpRequest(args: ExpressContext) {
    const authHeader = args.req.header("authorization");
    if (typeof authHeader === "string") {
      const decodedToken = await decodeToken(authHeader);
      return new GraphqlContext({
        expressContext: args,
        claims: decodedToken?.claims,
      });
    }

    const cookies = Cookie.parse(args.req.cookies);
    const cookie = cookies[config.get("COOKIE_KEY")];
    if (typeof cookie === "string") {
      const decodedToken = await decodeToken(cookie);
      return new GraphqlContext({
        expressContext: args,
        claims: decodedToken?.claims,
      });
    }

    return new GraphqlContext({
      expressContext: args,
    });
  }

  static async fromWebSocket(connectionParams: any, websocket: WebSocket) {
    // TODO: Correctly type connectionParams
    if (
      typeof connectionParams !== "object" ||
      typeof connectionParams["authToken"] !== "string"
    ) {
      throw new ForbiddenError("No auth token provided");
    }

    const decodedToken = await decodeToken(connectionParams["authToken"]);
    return new GraphqlContext({
      websocket,
      claims: decodedToken?.claims,
    });
  }
}
