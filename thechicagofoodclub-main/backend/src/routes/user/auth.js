import express from "express";
import { userTestController } from "../../controllers/user/auth.js";
import { validationMiddleware } from "../../middlewares/validation_middleware.js";
import {
  editProfileSchema,
  contactSchema,
} from "../../validation_schemas/user.validation.schemas.js";
import { authentication } from "../../middlewares/auth_middleware.js";
import { editProfile, contactController } from "../../controllers/user/auth.js";
const router = express.Router();

router.get("/", userTestController);

router.post(
  "/edit-profile",
  authentication,
  validationMiddleware(editProfileSchema, (req) => req.body),
  editProfile
);

router.post(
  "/contact",
  validationMiddleware(contactSchema, (req) => req.body),
  contactController
);

export default router;
