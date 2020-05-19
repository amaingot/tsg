import fs from "fs";
import path from "path";
import express, { Application } from "express";
import Mustache from "mustache";

import config from "./config";

const renderHtml = (app: Application) => {
  const assetPath =
    config.get("NODE_ENV") === "production"
      ? path.join(__dirname, "../../assets")
      : path.join(__dirname, "../../../web/build");

  app.use(express.static(assetPath));

  const rawHtml = fs.readFileSync(`${assetPath}/index.html`, "utf8");

  // Config values for client
  // const MAPBOX_TOKEN = config.get("MAPBOX_TOKEN");

  const html = Mustache.render(rawHtml, {
    // MAPBOX_TOKEN,
  });

  app.get("/*", (_req, res) => {
    res.send(html);
  });
};

export default renderHtml;
