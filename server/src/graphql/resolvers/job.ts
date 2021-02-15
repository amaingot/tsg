import { getRepository } from "typeorm";
import { buildPaginator } from "typeorm-cursor-pagination";
import { UserInputError } from "apollo-server-express";

import { JobResolvers, MutationResolvers, QueryResolvers } from "../types";
import * as DB from "../../db";

export const get: Required<QueryResolvers>["job"] = async (
  _parent,
  { id },
  context
) => {
  const job = await getRepository(DB.Job).findOne(id);

  if (!job) {
    throw new UserInputError("Cannot find job");
  }

  await context.isInAccount(job.accountId);

  return job;
};

export const getDetails: Required<JobResolvers>["details"] = async (
  parent
) => {
  const { id: jobId } = parent;
  return getRepository(DB.JobDetail).find({
    jobId,
  });
};

export const getHistory: Required<JobResolvers>["history"] = async (
  parent
) => {
  const { id: jobId } = parent;
  const histories = await getRepository(DB.JobHistory).find({
    jobId,
  });

  return histories.map((h) => ({
    ...h,
    snapshot: JSON.parse(h.snapshot) as any,
  }));
};

export const list: Required<QueryResolvers>["jobs"] = async (
  _parent,
  { input },
  context
) => {
  const { limit, order } = input || {};
  const { value: cursorKey, type } = input?.cursor || {};
  const { id: accountId } = await context.getCurrentAccount();

  const alias = "c";
  const query = getRepository(DB.Job)
    .createQueryBuilder(alias)
    .where({ accountId });

  const count = await query.getCount();

  const paginator = buildPaginator({
    entity: DB.Job,
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

export const create: Required<MutationResolvers>["createJob"] = async (
  _parent,
  { input },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const currentAccount = await context.getCurrentAccount();
  const job = await getRepository(DB.Job)
    .create({ ...input, accountId: currentAccount.id })
    .save();

  await getRepository(DB.JobHistory)
    .create({
      jobId: job.id,
      snapshot: JSON.stringify(job),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return job;
};

export const update: Required<MutationResolvers>["updateJob"] = async (
  _parent,
  { id, input },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const job = await getRepository(DB.Job).findOne(id);

  if (!job) {
    throw new UserInputError("Cannot find job");
  }

  await context.isInAccount(job.accountId);

  await getRepository(DB.Job).update(id, input);
  await job.reload();

  await getRepository(DB.JobHistory)
    .create({
      jobId: job.id,
      snapshot: JSON.stringify(job),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return job;
};

export const archive: Required<MutationResolvers>["archiveJob"] = async (
  _parent,
  { id },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const job = await getRepository(DB.Job).findOne({ id });

  if (!job) {
    throw new UserInputError("Job not found");
  }

  await context.isInAccount(job.accountId);

  await job.softRemove();
  await job.reload();

  await getRepository(DB.JobHistory)
    .create({
      jobId: job.id,
      snapshot: JSON.stringify(job),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return job;
};

export const unarchive: Required<MutationResolvers>["unarchiveJob"] = async (
  _parent,
  { id },
  context
) => {
  const currentEmployee = await context.getCurrentEmployee();
  const job = await getRepository(DB.Job).findOne({ id });

  if (!job) {
    throw new UserInputError("Job not found");
  }

  await context.isInAccount(job.accountId);

  const recoveredJob = job.recover();

  await getRepository(DB.JobHistory)
    .create({
      jobId: job.id,
      snapshot: JSON.stringify(recoveredJob),
      createdByEmployeeId: currentEmployee.id,
    })
    .save();

  return recoveredJob;
};
