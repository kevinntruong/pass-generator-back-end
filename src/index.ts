import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createRoutes } from "./routes/index.js";
import { cors } from "./middleware/cors.js";
import { logger } from "./middleware/logger.js";
import { CONFIG } from "./config/constants.js";

// Create the main Hono app
const app = new Hono();

// Apply global middleware
app.use("*", cors);
app.use("*", logger);

// Mount all routes
createRoutes(app);

// Root endpoint
app.get("/", (c) => {
  return c.json({
    message: "Pass Generator API",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

// Start the server
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
    console.log(`📱 Environment: ${CONFIG.ENVIRONMENT}`);
    console.log(`🔍 Health check: http://localhost:${info.port}/health`);
  }
);
