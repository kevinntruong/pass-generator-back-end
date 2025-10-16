import { Hono } from "hono";

export const healthRoutes = new Hono();

healthRoutes.get("/", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "pass-generator-backend",
  });
});

healthRoutes.get("/ping", (c) => {
  return c.text("pong");
});
