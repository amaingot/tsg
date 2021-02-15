import { buildPaginator } from "typeorm-cursor-pagination";
import crypto from "crypto";
import { getRepository } from "typeorm";
import { UserInputError } from "apollo-server-express";

import { MutationResolvers, QueryResolvers } from "../types";
import * as DB from "../../db";

export const list: Required<QueryResolvers>["users"] = async (
  _parent,
  { input },
  context
) => {
  await context.isSuperAdmin();
  const { limit, order } = input || {};
  const { value: cursorKey, type } = input?.cursor || {};

  const alias = "u";
  const query = getRepository(DB.User).createQueryBuilder(alias);

  const count = await query.getCount();

  const paginator = buildPaginator({
    entity: DB.User,
    query: {
      limit,
      order,
      afterCursor: type === "AFTER" ? cursorKey : undefined,
      beforeCursor: type === "BEFORE" ? cursorKey : undefined,
    },
    alias,
  });
  const { data, cursor } = await paginator.paginate(query);

  return {
    data,
    cursor: {
      count,
      afterCursor: cursor.afterCursor || undefined,
      beforeCursor: cursor.beforeCursor || undefined,
    },
  };
};

export const create: Required<MutationResolvers>["createUser"] = async (
  _parent,
  { input },
  context
) => {
  await context.isSuperAdmin();
  const { email, password, cellPhone, type } = input;

  const user = getRepository(DB.User).create({ email, cellPhone, type });
  user.encryptPassword(password || crypto.randomBytes(32).toString("base64"));
  await user.save();

  return user;
};

export const update: Required<MutationResolvers>["updateUser"] = async (
  _parent,
  { id, input },
  context
) => {
  await context.isSuperAdmin();
  const { email, password, cellPhone, type } = input;
  const user = await getRepository(DB.User).findOne({ id });

  if (!user) {
    throw new UserInputError("User not found");
  }

  user.email = email;
  password && user.encryptPassword(password);
  user.cellPhone = cellPhone;
  user.type = type;

  await user.save();

  return user;
};

export const archive: Required<MutationResolvers>["archiveUser"] = async (
  _parent,
  { id },
  context
) => {
  await context.isSuperAdmin();
  const user = await getRepository(DB.User).findOne({ id });

  if (!user) {
    throw new UserInputError("User not found");
  }

  await user.softRemove();
  await user.reload();

  return user;
};

export const unarchive: Required<MutationResolvers>["unarchiveUser"] = async (
  _parent,
  { id },
  context
) => {
  await context.isSuperAdmin();
  const user = await getRepository(DB.User).findOne({ id });

  if (!user) {
    throw new UserInputError("User not found");
  }

  return user.recover();
};

export const impersonate: Required<MutationResolvers>["impersonateEmployee"] = async (
  _parent,
  { id },
  context
) => {
  await context.isSuperAdmin();
  const employee = await getRepository(DB.Employee).findOne({ id });
  const user =
    employee &&
    (await getRepository(DB.User).findOne({ email: employee.email }));

  if (!employee || !user) {
    throw new UserInputError("Unknown employee");
  }

  const token = user.createUserToken();
  // TODO: Set user token with res.cookie(token, {...tokenOptions})

  return {
    token,
    employeeId: employee.id,
    userId: user.id, // TODO: Replace with current logged in user
  };
};
