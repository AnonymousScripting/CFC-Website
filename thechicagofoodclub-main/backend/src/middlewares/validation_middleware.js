import { z, ZodError } from "zod";
import { errorResponse } from "../utils/customResponses.js";

const validationMiddleware = (schema, parseParam) => {
  return (req, res, next) => {
    try {
      schema.parse(parseParam(req));
      next();
    } catch (error) {
      console.error("Validation middleware caught error:", error);

      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        }));
        return errorResponse(res, errorDetails, 400);
      }

      return errorResponse(res, error.message || "Internal server error", 500);
    }
  };
};

export { validationMiddleware };
