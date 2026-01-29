import express from "express"
import { adminTestController } from "../../controllers/admin/auth.js"
const router = express.Router()

router.get(
  "/",
  adminTestController,
)

export default router
