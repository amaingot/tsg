import { getRepository } from "typeorm";
import { buildPaginator } from "typeorm-cursor-pagination";
import { ForbiddenError, UserInputError } from "apollo-server-express";

import { MutationResolvers, QueryResolvers } from "../types";
import * as DB from "../../db";

export const customer: Required<QueryResolvers>["customer"] = async (
  _parent,
  { id },
  context
) => {
  const customer = await getRepository(DB.Customer).findOne(id);

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  await context.isInAccount(customer.accountId);

  return customer;
};

export const customers: Required<QueryResolvers>["customers"] = async (
  _parent,
  { input },
  context
) => {
  const { limit, order } = input || {};
  const { value: cursorKey, type } = input?.cursor || {};
  const { id: accountId } = await context.getCurrentAccount();

  const alias = "c";
  const query = getRepository(DB.Customer)
    .createQueryBuilder(alias)
    .where({ accountId });

  const count = await query.getCount();

  const paginator = buildPaginator({
    entity: DB.Customer,
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

export const createCustomer: Required<MutationResolvers>["createCustomer"] = async (
  _parent,
  { input },
  context
) => {
  const currentAccount = await context.getCurrentAccount();
  const customer = await getRepository(DB.Customer)
    .create({ ...input, accountId: currentAccount.id })
    .save();

  return customer;
};

export const updateCustomer: Required<MutationResolvers>["updateCustomer"] = async (
  _parent,
  { id, input },
  context
) => {
  const customer = await getRepository(DB.Customer).findOne(id);

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  await context.isInAccount(customer.accountId);

  await getRepository(DB.Customer).update(id, input);
  await customer.reload();

  return customer;
};

export const archiveCustomer: Required<MutationResolvers>["archiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const customer = await getRepository(DB.Customer).findOne({ id });

  if (!customer) {
    throw new UserInputError("Customer not found");
  }

  await context.isInAccount(customer.accountId);

  await customer.softRemove();
  await customer.reload();

  return customer;
};

export const unarchiveCustomer: Required<MutationResolvers>["unarchiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const customer = await getRepository(DB.Customer).findOne({ id });

  if (!customer) {
    throw new UserInputError("Customer not found");
  }

  await context.isInAccount(customer.accountId);

  return customer.recover();
};
