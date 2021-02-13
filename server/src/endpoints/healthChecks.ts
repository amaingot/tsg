import { RequestHandler } from "express";
import { getConnection } from "typeorm";

export const ready: RequestHandler = async (_req, res) => {
  const { isConnected } = getConnection();

  if (isConnected) {
    return res.status(200).send("Ready");
  } else {
    return res.status(500).send("Not ready");
  }
};

export const alive = ready;
