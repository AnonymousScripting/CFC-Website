import express from "express";
import userRoutes from "./user/index.js";
import adminRoutes from "./admin/index.js";
import authRoutes from "./auth.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);

export default router;
