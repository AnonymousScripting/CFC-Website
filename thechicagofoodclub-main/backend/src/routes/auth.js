import express from "express";
import {
  login,
  getVerifiedUsers,
  ForgotPassword,
  getResetPasswordLink,
  resetPassword,
  changePassword
} from "../controllers/auth.js";
import { checkUserVerified } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/login", checkUserVerified, login);
router.post("/forgot-password", getResetPasswordLink);
router.patch("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.get("/verified-users", getVerifiedUsers);

export default router;
