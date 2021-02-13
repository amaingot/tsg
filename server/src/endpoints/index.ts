import { Application } from "express";
import { alive, ready } from "./healthChecks";
import { serveHtml, serveStaticAssets } from "./renderHtml";

export const mountEndpoints = (app: Application) => {
  app.get("/_health/ready", ready);
  app.get("/_health/alive", alive);
  app.use(serveStaticAssets);
  app.get("/*", serveHtml);
};
