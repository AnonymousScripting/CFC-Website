import {
  successResponse,
  errorResponse,
  unauthorizeResponse,
} from "../../utils/customResponses.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import database from "../../../db/database.js";
import { user } from "../../../db/schema/user.js";
import { membershipRequest } from "../../../db/schema/membershipRequest.js";
import {
  createOTP,
  createJWTToken,
  getToken,
  verifyToken,
} from "../../utils/helper.js";
import { generateContactEmail } from "../../utils/emailTemplates.js";
import sendEmail from "../../utils/sendEmail.js";
import { ADMIN_EMAIL } from "../../utils/constants.js";

const userTestController = (req, res) => {
  try {
    const user = { name: "Ahsan Anees" };
    return successResponse(res, "User Route is working", user);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// API to register a new user
const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = createOTP();
    try {
      const data = await database
        .insert(user)
        .values({
          fullName,
          email,
          phone,
          password: hashedPassword,
          otp,
        })
        .returning({
          id: user.id,
          email: user.email,
          otp: user.otp,
        });

      return successResponse(res, "User Registered Successfully!", {
        data,
      });
    } catch (error) {
      return errorResponse(
        res,
        `Error in sending email = ${error.message}`,
        400
      );
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

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
const editProfile = async (req, res) => {
  try {
    const userId = req.loggedInUserId;
    const { fullName, phone, profilePicture, profilePicturePath, linkedinUrl, instagramHandle, discordHandle } = req.body;

    if (!userId) {
      return unauthorizeResponse(res, "Unauthorized");
    }

    const existingUser = await database
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (existingUser.length === 0) {
      return unauthorizeResponse(res, "User not Registered!");
    }

    const updateData = {
      ...(req.body.hasOwnProperty("fullName") && { fullName }),
      ...(req.body.hasOwnProperty("phone") && { phone }),
      ...(req.body.hasOwnProperty("profilePicture") && { profilePicture }),
      ...(req.body.hasOwnProperty("profilePicturePath") && {
        profilePicturePath,
      }),
      ...(req.body.hasOwnProperty("linkedinUrl") && { linkedinUrl: linkedinUrl || null }),
      ...(req.body.hasOwnProperty("instagramHandle") && { instagramHandle: instagramHandle || null }),
      ...(req.body.hasOwnProperty("discordHandle") && { discordHandle: discordHandle || null }),
      updatedAt: new Date(),
    };

    if (Object.keys(updateData).length === 1) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    const updatedUser = await database
      .update(user)
      .set(updateData)
      .where(eq(user.id, userId))
      .returning();

    const membershipUpdateData = {
      ...(req.body.hasOwnProperty("fullName") && { fullName }),
      ...(req.body.hasOwnProperty("phone") && { phoneNumber: phone }),
      email: updatedUser[0].email,
    };

    await database
      .update(membershipRequest)
      .set(membershipUpdateData)
      .where(eq(membershipRequest.userId, userId));

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser[0],
    });
  } catch (error) {
    console.error("Edit profile error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const contactController = async (req, res) => {
  try {
    const { email, fullName, phone, interest, message } = req.body;

    const { subject, html } = generateContactEmail({
      fullName,
      email,
      phone,
      interest,
      message,
    });

    await sendEmail(subject, html, ADMIN_EMAIL);

    return res
      .status(201)
      .json({ success: true, message: "Message submitted successfully!" });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
export {
  userTestController,
  login,
  registerUser,
  editProfile,
  contactController,
};
