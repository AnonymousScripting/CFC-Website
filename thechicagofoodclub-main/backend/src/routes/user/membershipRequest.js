import express from "express";
import { createMembershipRequest } from "../../controllers/user/membershipRequest.js";
import { validationMiddleware } from "../../middlewares/validation_middleware.js";
import { checkUserAlreadyRequested } from "../../middlewares/auth_middleware.js";
import { createRequestSchema } from "../../validation_schemas/user.validation.schemas.js";

const router = express.Router();

router.post(
  "/create",
  validationMiddleware(createRequestSchema, (req) => req.body),
  checkUserAlreadyRequested,
  createMembershipRequest
);

export default router;
