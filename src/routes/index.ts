import { Hono } from "hono";
import { healthRoutes } from "./health.js";
import { passRoutes } from "./pass.js";

export const createRoutes = (app: Hono) => {
  // Mount route groups
  app.route("/health", healthRoutes);
  app.route("/pass", passRoutes);

  return app;
};
