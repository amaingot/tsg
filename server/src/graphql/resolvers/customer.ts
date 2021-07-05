import { UserInputError } from "apollo-server-express";

import {
  ResolversTypes,
  CustomerResolvers,
  MutationResolvers,
  QueryResolvers,
} from "../types";
import { DB } from "../../db";
import { Customer as DatabaseCustomer } from "@prisma/client";

const toGql = (dbCustomer: DatabaseCustomer): ResolversTypes["Customer"] => ({
  ...dbCustomer,
  archived: dbCustomer.deletedAt === null,
});

export const get: Required<QueryResolvers>["customer"] = async (
  _parent,
  { id },
  context
) => {
  const customer = await DB.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  await context.isInAccount(customer.accountId);

  return toGql(customer);
};

export const getDetails: Required<CustomerResolvers>["details"] = async (
  parent
) => {
  const { id: customerId } = parent;
  return DB.customerDetail.findMany({
    where: {
      customerId,
      deletedAt: null,
    },
  });
};

export const getHistory: Required<CustomerResolvers>["history"] = async (
  parent
) => {
  const { id: customerId } = parent;
  const history = await DB.customerHistory.findMany({
    where: {
      customerId,
    },
  });
  return history.map((h) => ({ ...h, snapshot: h.snapshot as any }));
};

export const getRelationships: Required<CustomerResolvers>["relationships"] = async (
  parent
) => {
  return [];
};

export const list: Required<QueryResolvers>["customers"] = async (
  _parent,
  { input },
  context
) => {
  const { limit, order } = input || {};
  // const { value: cursorKey, type } = input?.cursor || {};
  const { id: accountId } = await context.getCurrentAccount();
  const query = {
    where: {
      accountId,
      deletedAt: null,
    },
  } as const;

  const customers = await DB.customer.findMany({
    ...query,
    take: limit || 100,
  });
  const count = await DB.customer.count(query);

  return {
    data: customers.map(toGql),
    cursor: {
      count,
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

  const customer = await DB.customer.create({
    data: {
      ...input,
      accountId: currentAccount.id,
    },
  });

  await DB.customerHistory.create({
    data: {
      customerId: customer.id,
      snapshot: JSON.stringify(customer),
      createdById: currentEmployee.id,
    },
  });

  return toGql(customer);
};

export const update: Required<MutationResolvers>["updateCustomer"] = async (
  _parent,
  { id, input },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  let customer = await DB.customer.findUnique({
    where: {
      id,
    },
  });

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  await context.isInAccount(customer.accountId);

  customer = await DB.customer.update({
    where: {
      id,
    },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  await DB.customerHistory.create({
    data: {
      customerId: customer.id,
      snapshot: JSON.stringify(customer),
      createdById: currentEmployee.id,
    },
  });

  return toGql(customer);
};

export const archive: Required<MutationResolvers>["archiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  let customer = await DB.customer.findUnique({
    where: {
      id,
    },
  });

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  await context.isInAccount(customer.accountId);

  customer = await DB.customer.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  });

  await DB.customerHistory.create({
    data: {
      customerId: customer.id,
      snapshot: JSON.stringify(customer),
      createdById: currentEmployee.id,
    },
  });

  return toGql(customer);
};

export const unarchive: Required<MutationResolvers>["unarchiveCustomer"] = async (
  _parent,
  { id },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  let customer = await DB.customer.findUnique({
    where: {
      id,
    },
  });

  if (!customer) {
    throw new UserInputError("Cannot find customer");
  }

  await context.isInAccount(customer.accountId);

  customer = await DB.customer.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date(),
      deletedAt: null,
    },
  });

  await DB.customerHistory.create({
    data: {
      customerId: customer.id,
      snapshot: JSON.stringify(customer),
      createdById: currentEmployee.id,
    },
  });

  return toGql(customer);
};
