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

  if (customer.accountId !== context.claims?.accountId) {
    throw new ForbiddenError("You do not have access to that customer");
  }

  return customer;
};

export const customers: Required<QueryResolvers>["customers"] = async (
  _parent,
  { input }
) => {
  const { limit, order } = input || {};
  const { value: cursorKey, type } = input?.cursor || {};

  const alias = "c";
  const query = getRepository(DB.Customer).createQueryBuilder(alias);

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
  const currentAccount = await context.getCurrentAccount();
  const customer = await getRepository(DB.Customer).findOne(id);

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  if (customer.accountId !== currentAccount.id) {
    throw new ForbiddenError(
      "You do not have permissions to update this customer"
    );
  }

  await getRepository(DB.Customer).update(id, input);
  await customer.reload();

  return customer;
};


export const archiveCustomer: Required<MutationResolvers>["archiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const currentAccount = await context.getCurrentAccount();
  const customer = await getRepository(DB.Customer).findOne({ id });

  if (!customer) {
    throw new UserInputError("Customer not found");
  }

  if (customer.accountId !== currentAccount.id) {
    throw new ForbiddenError(
      "You do not have permissions to archive this customer"
    );
  }

  await customer.softRemove();
  await customer.reload();

  return customer;
};

export const unarchiveCustomer: Required<MutationResolvers>["unarchiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const currentAccount = await context.getCurrentAccount();
  const customer = await getRepository(DB.Customer).findOne({ id });

  if (!customer) {
    throw new UserInputError("Customer not found");
  }

  if (customer.accountId !== currentAccount.id) {
    throw new ForbiddenError(
      "You do not have permissions to unarchive this customer"
    );
  }

  return customer.recover();
};