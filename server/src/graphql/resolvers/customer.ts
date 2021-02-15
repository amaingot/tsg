import { getRepository } from "typeorm";
import { buildPaginator } from "typeorm-cursor-pagination";
import { UserInputError } from "apollo-server-express";

import { CustomerResolvers, MutationResolvers, QueryResolvers } from "../types";
import * as DB from "../../db";

export const get: Required<QueryResolvers>["customer"] = async (
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

export const getDetails: Required<CustomerResolvers>["details"] = async (
  parent
) => {
  const { id: customerId } = parent;
  return getRepository(DB.CustomerDetail).find({
    customerId,
  });
};

export const getHistory: Required<CustomerResolvers>["history"] = async (
  parent
) => {
  const { id: customerId } = parent;
  const histories = await getRepository(DB.CustomerHistory).find({
    customerId,
  });

  return histories.map((h) => ({
    ...h,
    snapshot: JSON.parse(h.snapshot) as any,
  }));
};

export const getRelationships: Required<CustomerResolvers>["relationships"] = async (
  parent
) => {
  const { id: customerId } = parent;
  const primaryRelationships = await getRepository(
    DB.CustomerRelationship
  ).find({
    customerId,
  });
  const secondaryRelationships = await getRepository(
    DB.CustomerRelationship
  ).find({
    relatedCustomerId: customerId,
  });
  return [...primaryRelationships, ...secondaryRelationships];
};

export const list: Required<QueryResolvers>["customers"] = async (
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

export const create: Required<MutationResolvers>["createCustomer"] = async (
  _parent,
  { input },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const currentAccount = await context.getCurrentAccount();
  const customer = await getRepository(DB.Customer)
    .create({ ...input, accountId: currentAccount.id })
    .save();

  await getRepository(DB.CustomerHistory)
    .create({
      customerId: customer.id,
      snapshot: JSON.stringify(customer),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return customer;
};

export const update: Required<MutationResolvers>["updateCustomer"] = async (
  _parent,
  { id, input },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const customer = await getRepository(DB.Customer).findOne(id);

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  await context.isInAccount(customer.accountId);

  await getRepository(DB.Customer).update(id, input);
  await customer.reload();

  await getRepository(DB.CustomerHistory)
    .create({
      customerId: customer.id,
      snapshot: JSON.stringify(customer),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return customer;
};

export const archive: Required<MutationResolvers>["archiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const customer = await getRepository(DB.Customer).findOne({ id });

  if (!customer) {
    throw new UserInputError("Customer not found");
  }

  await context.isInAccount(customer.accountId);

  await customer.softRemove();
  await customer.reload();

  await getRepository(DB.CustomerHistory)
    .create({
      customerId: customer.id,
      snapshot: JSON.stringify(customer),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return customer;
};

export const unarchive: Required<MutationResolvers>["unarchiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const customer = await getRepository(DB.Customer).findOne({ id });

  if (!customer) {
    throw new UserInputError("Customer not found");
  }

  await context.isInAccount(customer.accountId);

  const recoveredCustomer = customer.recover();

  await getRepository(DB.CustomerHistory)
    .create({
      customerId: customer.id,
      snapshot: JSON.stringify(recoveredCustomer),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return recoveredCustomer;
};
