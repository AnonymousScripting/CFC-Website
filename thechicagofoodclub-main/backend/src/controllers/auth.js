import {
  successResponse,
  errorResponse,
  unauthorizeResponse,
} from "../utils/customResponses.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import database from "../../db/database.js";
import { user } from "../../db/schema/user.js";
import { createJWTToken } from "../utils/helper.js";
import sendEmail from "../utils/sendEmail.js";
import { FRONTEND_MAIN_URL } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../utils/constants.js";
import { generatePasswordResetEmail } from "../utils/emailTemplates.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await database.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!data) {
      return unauthorizeResponse(res, "User not Registered!");
    }

    if (!data.isVerified) {
      return errorResponse(res, "User not verified", 403);
    }

    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
      return unauthorizeResponse(res, "Credentials are Wrong!");
    }

    const token = await createJWTToken(data.id);

    return successResponse(res, "Login Successfully", { 
      data: {
        ...data,
        isTemporaryPassword: data.isTemporaryPassword || false,
      }, 
      token 
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getVerifiedUsers = async (req, res) => {
  try {
    const data = await database.query.user.findMany({
      where: eq(user.isVerified, true),
    });

    return successResponse(res, "Verified Users fetched Successfully", {
      users: data,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getResetPasswordLink = async (req, res) => {
  try {
    console.log("🔍 DEBUG: getResetPasswordLink called");
    console.log("🔍 DEBUG: FRONTEND_MAIN_URL =", FRONTEND_MAIN_URL);
    console.log("🔍 DEBUG: JWT_PRIVATE_KEY exists =", !!JWT_PRIVATE_KEY);

    const { email } = req.body;
    console.log("🔍 DEBUG: email =", email);

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    const data = await database.query.user.findFirst({
      where: eq(user.email, email),
    });
    console.log("🔍 DEBUG: user found =", !!data);

    if (!data) {
      return errorResponse(res, "User with this email does not exist.", 404);
    }

    const { fullName } = data;
    console.log("🔍 DEBUG: fullName =", fullName);

    const token = jwt.sign({ id: data.id }, JWT_PRIVATE_KEY, { expiresIn: "15m" });
    console.log("🔍 DEBUG: token generated =", !!token);

    const resetLink = `${FRONTEND_MAIN_URL}/reset-password/${token}`;

    // DEV MODE: Log reset link to console for easy testing
    console.log("\n========================================");
    console.log("🔐 PASSWORD RESET LINK (DEV MODE)");
    console.log("========================================");
    console.log(`User: ${fullName} (${email})`);
    console.log(`Link: ${resetLink}`);
    console.log("========================================\n");

    // Attempt to send email, but don't fail if it doesn't work
    try {
      const { subject, html } = generatePasswordResetEmail(fullName, resetLink);
      await sendEmail(subject, html, email);
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.log("⚠️  Email failed to send (check console for reset link):", emailError.message);
    }

    return successResponse(res, "Password reset link sent successfully to your email address.", {});
  } catch (error) {
    console.error("❌ getResetPasswordLink Error:", error);
    return errorResponse(res, error.message, 500);
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("🔍 DEBUG: resetPassword called");
    const { token, newPassword } = req.body
    console.log("🔍 DEBUG: token exists =", !!token);
    console.log("🔍 DEBUG: newPassword exists =", !!newPassword);

    const decoded = jwt.verify(token, JWT_PRIVATE_KEY)
    console.log("🔍 DEBUG: token decoded, user id =", decoded.id);

    const { id } = decoded
    const data = await database.query.user.findFirst({
      where: eq(user.id, id),
    })
    console.log("🔍 DEBUG: user found =", !!data);

    if (!data) {
      return errorResponse(res, "User not found.", 400)
    }
    const isSameAsCurrentPassword = await bcrypt.compare(newPassword, data.password)
    console.log("🔍 DEBUG: isSameAsCurrentPassword =", isSameAsCurrentPassword);

    if (isSameAsCurrentPassword) {
      return errorResponse(res, "New password must be different from the current password.", 400)
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await database
      .update(user)
      .set({
        password: hashedPassword,
        isTemporaryPassword: false,
        updatedAt: new Date()
      })
      .where(eq(user.id, id))

    console.log("✅ Password updated successfully for user:", id);
    return successResponse(res, "Password has been reset successfully.", {})
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Password reset link has expired.", 400)
    }
    return errorResponse(res, error.message, 500)
  }
}


const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return errorResponse(res, "userId, currentPassword, and newPassword are required", 400);
    }

    const data = await database.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!data) {
      return errorResponse(res, "User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, data.password);
    if (!isPasswordValid) {
      return errorResponse(res, "Current password is incorrect", 401);
    }

    const isSamePassword = await bcrypt.compare(newPassword, data.password);
    if (isSamePassword) {
      return errorResponse(res, "New password must be different from the current password", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await database
      .update(user)
      .set({ 
        password: hashedPassword, 
        isTemporaryPassword: false,
        updatedAt: new Date() 
      })
      .where(eq(user.id, userId));

    return successResponse(res, "Password changed successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export {
  login,
  getVerifiedUsers,
  getResetPasswordLink,
  resetPassword,
  changePassword
};
