import database from "../../../db/database.js";
import { membershipRequest } from "../../../db/schema/membershipRequest.js";
import { user } from "../../../db/schema/user.js";
import { eq, and } from "drizzle-orm";
import { generateRandomPassword } from "../../utils/helper.js";
import sendEmail from "../../utils/sendEmail.js";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../../utils/customResponses.js";
import {
  generateMembershipEmail,
  generateActivationEmail,
  generateDeactivationEmail,
} from "../../utils/emailTemplates.js";

// Admin response to membership request
const respondToMembershipRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminId, action, rejectionReason } = req.body;

    const request = await database.query.membershipRequest.findFirst({
      where: eq(membershipRequest.id, requestId),
    });

    if (!request) {
      return errorResponse(res, "Membership request not found", 404);
    }

    if (request.status === "approved" || request.status === "rejected") {
      return errorResponse(
        res,
        `This membership request has already been ${request.status}`,
        400
      );
    }

    let updateData = {
      status: action,
      reviewedBy: adminId,
      reviewedAt: new Date(),
      rejectionReason: action === "rejected" ? rejectionReason : null,
    };

    if (action === "approved") {
      // Check if user already exists
      const existingUser = await database.query.user.findFirst({
        where: eq(user.email, request.email),
      });

      let targetUser;
      let randomPassword = null;

      if (existingUser) {
        // User exists — link them and activate
        targetUser = existingUser;
        await database
          .update(user)
          .set({ isVerified: true, isActive: true })
          .where(eq(user.id, existingUser.id));
      } else {
        // Create new user
        randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const [newUser] = await database
          .insert(user)
          .values({
            email: request.email,
            fullName: request.fullName,
            phone: request.phoneNumber,
            password: hashedPassword,
            isVerified: true,
          })
          .returning();

        targetUser = newUser;
      }

      updateData.userId = targetUser.id;

      const { subject, html } = generateMembershipEmail({
        type: "approved",
        fullName: request.fullName,
        email: request.email,
        password: randomPassword, // null if existing user
      });

      try {
        await sendEmail(subject, html, request.email);
      } catch (error) {
        console.warn('Email notification failed (non-critical):', error.message);
      }
    }

    if (action === "rejected") {
      const { subject, html } = generateMembershipEmail({
        type: "rejected",
        fullName: request.fullName,
        reason: rejectionReason,
      });

      try {
        await sendEmail(subject, html, request.email);
      } catch (error) {
        console.warn('Email notification failed (non-critical):', error.message);
      }
    }

    await database
      .update(membershipRequest)
      .set(updateData)
      .where(eq(membershipRequest.id, requestId));

    return successResponse(res, `Membership request ${action} successfully`);
  } catch (error) {
    console.error("Error responding to request:", error);
    return errorResponse(res, error.message, 500);
  }
};

const getMembershipRequestStats = async (req, res) => {
  try {
    // pending
    const pendingRequests = await database.query.membershipRequest.findMany({
      where: eq(membershipRequest.status, "pending"),
    });

    // approved
    const approvedRequests = await database.query.membershipRequest.findMany({
      where: eq(membershipRequest.status, "approved"),
    });

    return successResponse(res, `stats fetched successfully`, {
      pending: pendingRequests.length,
      approved: approvedRequests.length,
    });
  } catch (error) {
    console.error("Error fetching membership request stats:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Get all approved membership requests
const getApprovedMembershipRequests = async (req, res) => {
  try {
    const approvedRequests = await database.query.membershipRequest.findMany({
      where: eq(membershipRequest.status, "approved"),
      with: {
        user: true,
      },
    });

     const filteredRequests = approvedRequests.filter(
       (u) => u.user);

    return successResponse(res, "Approved members fetched successfully", {
      data: filteredRequests,
    });
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    return errorResponse(res, error.message, 500);
  }
};
const getVerifiedMembers = async (req, res) => {
  try {
    const userId = req.query.userId
    const approvedRequests = await database.query.membershipRequest.findMany({
      where: eq(membershipRequest.status, "approved"),
      with: {
        user: {
          where: eq(user.isActive, true),
        },
      },
    });

        const filteredRequests = approvedRequests.filter(
      (u) => u.user && u.user.id !== userId
        );

    return successResponse(res, "Verified members fetched successfully", {
      data: filteredRequests,
    });
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Get all pending membership requests
const getPendingMembershipRequests = async (req, res) => {
  try {
    const approvedRequests = await database
      .select()
      .from(membershipRequest)
      .where(eq(membershipRequest.status, "pending"));

    return successResponse(res, `pending members fetched successfully`, {
      data: approvedRequests,
    });
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Activate / Deactivate user
const changeVerificationStatus = async (req, res) => {
  const { isVerified, userId, reason } = req.body;

  try {
    // Update user status
    const [updatedUser] = await database
      .update(user)
      .set({ isActive: isVerified })
      .where(eq(user.id, userId))
      .returning();

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Send email based on status (non-blocking)
    if (isVerified) {
      const { subject, html } = generateActivationEmail({
        fullName: updatedUser.fullName,
      });
      try {
        await sendEmail(subject, html, updatedUser.email);
      } catch (error) {
        console.warn('Activation email failed (non-critical):', error.message);
      }
    } else {
      const { subject, html } = generateDeactivationEmail({
        fullName: updatedUser.fullName,
        reason: reason || "No reason provided",
      });
      try {
        await sendEmail(subject, html, updatedUser.email);
      } catch (error) {
        console.warn('Deactivation email failed (non-critical):', error.message);
      }
    }

    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating verification status:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export {
  respondToMembershipRequest,
  getMembershipRequestStats,
  getApprovedMembershipRequests,
  getPendingMembershipRequests,
  changeVerificationStatus,
  getVerifiedMembers,
};
