import WebSocket from "ws";
import Cookie from "cookie";
import { Request, Response } from "express";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { ForbiddenError, UserInputError } from "apollo-server-express";
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

  private _user?: DB.User;
  private _employee?: DB.Employee;
  private _account?: DB.Account;

  constructor(params: GraphqlContextParams) {
    const { req, res } = params.expressContext || {};
    this.req = req as any;
    this.res = res as any;
    this.websocket = params.websocket;
    this.claims = params.claims;
  }

  /// Factories

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

  /// Context Functions

  public async getCurrentUser() {
    if (this._user) return this._user;
    this._user =
      this.claims && (await getRepository(DB.User).findOne(this.claims.userId));

    if (!this._user) {
      throw new ForbiddenError("Not logged in");
    }

    return this._user;
  }

  public async getCurrentEmployee() {
    if (this._employee) return this._employee;
    this._employee = this.claims?.employeeId
      ? await getRepository(DB.Employee).findOne(this.claims.employeeId)
      : undefined;

    if (!this._employee) {
      throw new ForbiddenError("No employee present");
    }

    return this._employee;
  }

  public async getCurrentAccount() {
    if (this._account) return this._account;
    this._account = this.claims?.accountId
      ? await getRepository(DB.Account).findOne(this.claims.accountId)
      : undefined;

    if (!this._account) {
      throw new ForbiddenError("No account present");
    }

    return this._account;
  }

  /// AUTH

  public async setCookie(claims: Claims) {
    const token = await createToken(claims);

    this.res?.cookie(config.get("COOKIE_KEY"), token, {
      signed: true,
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      sameSite: "strict",
    });
  }

  public clearCookie() {
    this.res?.clearCookie(config.get("COOKIE_KEY"));
  }

  /// PERMISSIONS

  public isAnonymous() {
    if (this.claims) {
      throw new UserInputError("You are already logged in");
    }
  }

  public async isSuperAdmin() {
    const user = await this.getCurrentUser();
    if (user.type !== "SUPERADMIN") {
      throw new ForbiddenError("Must be super admin");
    }
  }

  public async isAccountOwner(accountId?: string) {
    const employee = await this.getCurrentEmployee();
    if (employee.type !== "ACCOUNT_OWNER") {
      throw new ForbiddenError("Must be an account owner");
    }
    if (accountId && employee.accountId !== accountId) {
      throw new ForbiddenError(
        "Must be an account owner of the correct account"
      );
    }
  }

  public async isInAccount(accountId: string) {
    const employee = await this.getCurrentEmployee();
    if (employee.accountId !== accountId) {
      throw new ForbiddenError("Must be in correct account");
    }
  }

  public async isLoggedIn() {
    await this.getCurrentUser();
  }
}
