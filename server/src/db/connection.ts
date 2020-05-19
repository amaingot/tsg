import { createConnection, getConnection, ConnectionOptions } from "typeorm";
import config from "../utils/config";
import { logger } from "../utils/logger";

export const CONNECTION_CONFIG: ConnectionOptions = {
  type: "postgres",
  username: config.get("POSTGRES_USERNAME"),
  host: config.get("POSTGRES_HOST"),
  password: config.get("POSTGRES_PASSWORD"),
  database: config.get("POSTGRES_DATABASE"),
  schema: "public",
  entities: ["src/db/entities/**/*.ts"],
  migrations: ["src/db/migrations/**/*.ts"],
  subscribers: ["src/db/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/db/entities",
    migrationsDir: "src/db/migrations",
    subscribersDir: "src/db/subscribers",
  },
  logging: "all",
};

export const openConnection = async () => {
  const connection = await createConnection(CONNECTION_CONFIG);

  try {
    if (!connection.isConnected) {
      await connection.connect();
      logger.info("Successfully connected to the database");
    } else {
      logger.info("Already connected to the database");
    }
  } catch (e) {
    logger.error({ message: "Error connecting to the database", error: e });
  }

  try {
    const migrations = await connection.runMigrations({ transaction: "each" });
    logger.info({
      message: "Successfully ran migrations on the database",
      migrations,
    });
  } catch (e) {
    logger.error({
      message: "Error running migrations on the database",
      error: e,
    });
  }
  return connection;
};

export const closeConnection = async () => {
  const connection = getConnection();

  await connection.close();
  logger.info("Disconnected from database");
};
