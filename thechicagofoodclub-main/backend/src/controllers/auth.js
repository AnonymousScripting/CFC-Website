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
import { generateMembershipEmail } from "../utils/emailTemplates.js";
import sendEmail from "../utils/sendEmail.js";
import { generateRandomPassword } from "../utils/helper.js";
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

    return successResponse(res, "Login Successfully", { data, token });
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

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email",email)

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }
    console.log("1")
    const data = await database.query.user.findFirst({
      where: eq(user.email, email),
    });
console.log("2")
    if (!data) {
      return unauthorizeResponse(res, "User not registered!");
    }
console.log("3")
    if (!data.isVerified) {
      return errorResponse(res, "User not verified", 403);
    }
console.log("4")
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
console.log("5")
    await database
      .update(user)
      .set({ password: hashedPassword })
      .where(eq(user.email, email));
console.log("6")
    const { subject, html } = generateMembershipEmail({
      type: "forgotPassword",
      fullName: data.fullName,
      email: data.email,
      password: randomPassword,
    });
console.log("7")
    await sendEmail(subject, html, data.email);
console.log("8")
    return successResponse(res, "New password sent to your email");
  } catch (error) {
    console.error("ForgotPassword Error:", error);
    return errorResponse(res, error.message, 500);
  }
};

const getResetPasswordLink = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    const data = await database.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!data) {
      return errorResponse(res, "User with this email does not exist.", 404);
    }

    const { fullName } = data;

    const token = jwt.sign({ id: data.id }, JWT_PRIVATE_KEY, { expiresIn: "15m" });

    const resetLink = `${FRONTEND_MAIN_URL}/reset-password/${token}`;
    const { subject, html } = generatePasswordResetEmail(fullName, resetLink);

    await sendEmail(subject, html, email);

    return successResponse(res, "Password reset link sent successfully to your email address.", {});
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY)
    const { id } = decoded
    const data = await database.query.user.findFirst({
      where: eq(user.id, id),
    })

    if (!data) {
      return errorResponse(res, "User not found.", 400)
    }
    const isSameAsCurrentPassword = await bcrypt.compare(newPassword, data.password)

    if (isSameAsCurrentPassword) {
      return errorResponse(res, "New password must be different from the current password.", 400)
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await database.transaction(async transaction => {
      const updatedData = await transaction
        .update(user)
        .set({ password: hashedPassword, updatedAt: new Date() })
        .where(eq(user.id, id))
        .returning()

      return successResponse(res, "Password has been reset successfully.", {})
    })
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Password reset link has expired.", 400)
    }
    return errorResponse(res, error.message, 500)
  }
}


export {
  login,
  getVerifiedUsers,
  ForgotPassword,
  getResetPasswordLink,
  resetPassword
};
