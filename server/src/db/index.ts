import { PrismaClient } from "@prisma/client";
import config from "../utils/config";

export { default as Account } from "./entities/Account";
export { default as Customer } from "./entities/Customer";
export { default as CustomerDetail } from "./entities/CustomerDetail";
export { default as CustomerHistory } from "./entities/CustomerHistory";
export { default as CustomerRelationship } from "./entities/CustomerRelationship";
export { default as Job } from "./entities/Job";
export { default as JobDetail } from "./entities/JobDetail";
export { default as JobHistory } from "./entities/JobHistory";
export { default as Employee } from "./entities/Employee";
export { default as User } from "./entities/User";
export { default as TimeSheetEntry } from "./entities/TimeSheetEntry";
export { default as TimeSheetReport } from "./entities/TimeSheetReport";

export { openConnection, closeConnection } from "./connection";

const username = config.get("POSTGRES_USERNAME");
const password = config.get("POSTGRES_PASSWORD");
const host = config.get("POSTGRES_HOST");
const port = "5432";
const database = config.get("POSTGRES_DATABASE");
const dbUrl = `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;

export const DB = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});
