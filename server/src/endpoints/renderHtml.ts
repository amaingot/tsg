import express, { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import Mustache from "mustache";
import config from "../utils/config";

const ASSET_PATH =
  config.get("NODE_ENV") === "production"
    ? path.join(__dirname, "../../assets")
    : path.join(__dirname, "../../../web/build");

export const serveStaticAssets = express.static(ASSET_PATH, {
  index: false,
});

export const serveHtml: RequestHandler = async (_req, res) => {
  const rawHtml = fs.readFileSync(`${ASSET_PATH}/index.html`, "utf8");

  const html = Mustache.render(rawHtml, {
    TENANT_ID: config.get("GCP_IDP_TENANT_ID"),
    FIREBASE_CONFIG: config.get("FIREBASE_APP_CONFIG").split('"').join('\\"'),
    STRIPE_KEY: config.get("STRIPE_PUBLIC_KEY"),
  });

  res.status(200).send(html);
};

