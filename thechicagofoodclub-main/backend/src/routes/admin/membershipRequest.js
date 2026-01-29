import express from "express";
import {
  respondToMembershipRequest,
  getMembershipRequestStats,
  getApprovedMembershipRequests,
  getPendingMembershipRequests,
  changeVerificationStatus,
  getVerifiedMembers,
} from "../../controllers/admin/membershipRequest.js";
import {
  respondToMembershipRequestSchema,
  changeVerificationStatusSchema,
} from "../../validation_schemas/user.validation.schemas.js";
import { validationMiddleware } from "../../middlewares/validation_middleware.js";

const router = express.Router();

// Admin responds to a membership request
router.post(
  "/respond/:requestId",
  validationMiddleware(respondToMembershipRequestSchema, (req) => req.body),
  respondToMembershipRequest
);

// Admin change verification status
router.post(
  "/change-verification",
  validationMiddleware(changeVerificationStatusSchema, (req) => req.body),
  changeVerificationStatus
);

router.get("/stats", getMembershipRequestStats);

router.get("/approvedMembers", getApprovedMembershipRequests);

router.get("/verifiedMembers", getVerifiedMembers);

router.get("/pendingRequests", getPendingMembershipRequests);

export default router;
