import type { Context, Next } from "hono";

export const validatePassRequest = async (c: Context, next: Next) => {
  try {
    const body = await c.req.json();

    // Basic validation
    if (!body.description || typeof body.description !== "string") {
      return c.json(
        {
          success: false,
          error: "Description is required and must be a string",
        },
        400
      );
    }

    if (!body.organizationName || typeof body.organizationName !== "string") {
      return c.json(
        {
          success: false,
          error: "Organization name is required and must be a string",
        },
        400
      );
    }

    // Pass validated data to the route handler
    c.set("validatedData", body);
    await next();
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Invalid JSON in request body",
      },
      400
    );
  }
};

export const validatePassId = async (c: Context, next: Next) => {
  const passId = c.req.param("passId");

  if (!passId || passId.length < 3) {
    return c.json(
      {
        success: false,
        error: "Valid pass ID is required",
      },
      400
    );
  }

  await next();
};
