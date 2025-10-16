import { Hono } from "hono";
import { stream } from "hono/streaming";
import { validatePassRequest } from "../middleware/validation.js";
import { generatePass } from "../services/passService.js";
import type { PassRequest } from "../types/pass.js";
import { generatePassId } from "../utils/uuid.js";

export const passRoutes = new Hono();

passRoutes.get("/test", async(c) => {
  const pass = await generatePass({
    description: "description",
    organizationName: "org",
    passTypeIdentifier: "passTypeID",
    teamIdentifier: "teamId"
  })

  const buffer = pass.getAsBuffer();
  c.header('Content-type', pass.mimeType)
  c.header('Content-disposition', `attachment; filename=test.pkpass`)

  return stream(c, async(stream) => {
    await stream.write(buffer)
  })
});

passRoutes.post("/generate", validatePassRequest, async (c) => {
  try {
    const passData: PassRequest = await c.req.json();
    const passResult = await generatePass(passData);

    const passId = generatePassId();
    // In a real application, the 'buffer' would be stored (e.g., in a database, S3, local file system)
    // and a download URL would be generated for it.
    // For now, we'll use a placeholder URL.
    const downloadUrl = `/passes/${passId}/download`; // This would be an endpoint that serves the buffer
    const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString(); // Expires in 1 hour from now

    return c.json(
      {
        success: true,
        data: {
          passId,
          downloadUrl,
          expiresAt,
        },
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
