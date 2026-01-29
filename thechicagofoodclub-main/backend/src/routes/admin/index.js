import express from "express";
import authRoutes from "./auth.js";
import membershipRoutes from "./membershipRequest.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/membership", membershipRoutes);

export default router;
