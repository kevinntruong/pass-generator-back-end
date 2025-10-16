import { Hono } from "hono";
import { generatePass } from "../services/passService.js";
import { validatePassRequest } from "../middleware/validation.js";
import type { PassRequest } from "../types/pass.js";

export const passRoutes = new Hono();

passRoutes.post("/generate", validatePassRequest, async (c) => {
  try {
    const passData: PassRequest = await c.req.json();
    const passResult = await generatePass(passData);

    return c.json(
      {
        success: true,
        data: passResult,
      },
      201
    );
  } catch (error) {
    console.error("Error generating pass:", error);
    return c.json(
      {
        success: false,
        error: "Failed to generate pass",
      },
      500
    );
  }
});

passRoutes.get("/validate/:passId", async (c) => {
  const passId = c.req.param("passId");

  if (!passId) {
    return c.json(
      {
        success: false,
        error: "Pass ID is required",
      },
      400
    );
  }

  return c.json({
    success: true,
    data: { passId, valid: true },
  });
});
