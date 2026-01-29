import express from "express";
import authRoutes from "./auth.js";
import membershipRequestRoutes from "./membershipRequest.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/membership", membershipRequestRoutes);

export default router;
