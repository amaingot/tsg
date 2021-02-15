import { getRepository } from "typeorm";
import { buildPaginator } from "typeorm-cursor-pagination";
import { UserInputError } from "apollo-server-express";

import { EmployeeResolvers, MutationResolvers, QueryResolvers } from "../types";
import * as DB from "../../db";

export const get: Required<QueryResolvers>["employee"] = async (
  _parent,
  { id },
  context
) => {
  const employee = await getRepository(DB.Employee).findOne(id);

  if (!employee) {
    throw new UserInputError("Cannot find employee");
  }

  await context.isInAccount(employee.accountId);

  return employee;
};

export const list: Required<QueryResolvers>["employees"] = async (
  _parent,
  { input },
  context
) => {
  const { limit, order } = input || {};
  const { value: cursorKey, type } = input?.cursor || {};
  const { id: accountId } = await context.getCurrentAccount();

  const alias = "c";
  const query = getRepository(DB.Employee)
    .createQueryBuilder(alias)
    .where({ accountId });

  const count = await query.getCount();

  const paginator = buildPaginator({
    entity: DB.Employee,
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

export const create: Required<MutationResolvers>["createEmployee"] = async (
  _parent,
  { input },
  context
) => {
  const currentAccount = await context.getCurrentAccount();
  const employee = await getRepository(DB.Employee)
    .create({ ...input, accountId: currentAccount.id })
    .save();

  return employee;
};

export const update: Required<MutationResolvers>["updateEmployee"] = async (
  _parent,
  { id, input },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const employee = await getRepository(DB.Employee).findOne(id);

  if (!employee) {
    throw new UserInputError("Cannot find employee");
  }

  await context.isInAccount(employee.accountId);

  await getRepository(DB.Employee).update(id, input);
  await employee.reload();

  return employee;
};

export const archive: Required<MutationResolvers>["archiveEmployee"] = async (
  _parent,
  { id },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const employee = await getRepository(DB.Employee).findOne({ id });

  if (!employee) {
    throw new UserInputError("Employee not found");
  }

  await context.isInAccount(employee.accountId);

  await employee.softRemove();
  await employee.reload();

  return employee;
};

export const unarchive: Required<MutationResolvers>["unarchiveEmployee"] = async (
  _parent,
  { id },
  context
) => {
  const employee = await getRepository(DB.Employee).findOne({ id });

  if (!employee) {
    throw new UserInputError("Employee not found");
  }

    await context.isAccountOwner(employee.accountId);

  const recoveredEmployee = employee.recover();

  return recoveredEmployee;
};
