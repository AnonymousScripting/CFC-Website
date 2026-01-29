import { eq } from "drizzle-orm";
import database from "../../db/database.js";
import { user } from "../../db/schema/user.js";
import { membershipRequest } from "../../db/schema/membershipRequest.js";
import blackListToken from "../../db/schema/blacklisttoken.js";
import { getToken, verifyToken } from "../utils/helper.js";
import {
  errorResponse,
  unauthorizeResponse,
} from "../utils/customResponses.js";

const authentication = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return unauthorizeResponse(res, "Authentication token is required");
    }

    const invalidToken = await database.query.blackListToken.findFirst({
      where: eq(blackListToken.token, token),
    });
    if (invalidToken) {
      return unauthorizeResponse(res, "Unauthorize! Invalid Token");
    }

    let decodedToken;

    try {
      decodedToken = verifyToken(token);
      if (decodedToken.tokenType === "refresh") {
        return unauthorizeResponse(
          res,
          "Invalid token! Refresh tokens cannot be used for authorization"
        );
      }
    } catch (error) {
      if (error.message === "TokenExpiredError") {
        return unauthorizeResponse(res, "Token has expired");
      }
      if (error.message === "InvalidTokenError") {
        return unauthorizeResponse(res, "Invalid token");
      }
      return unauthorizeResponse(res, "Token verification failed");
    }

    const data = await database.query.user.findFirst({
      where: eq(user.id, decodedToken.id),
      columns: { id: true },
    });

    if (!data) {
      return unauthorizeResponse(res, "Unauthorize! User not Found");
    }
    // Sending LoggedIn user in the next middleware
    req.loggedInUserId = data.id;
    next();
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
// Middleware to check if user is already registered
const checkUserAlreadyRegistered = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await database.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (data) {
      return errorResponse(
        res,
        "user with this Email is already Registered",
        409
      );
    }
    next();
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// Middleware to check if user is already registered
const checkUserAlreadyRequested = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await database.query.membershipRequest.findFirst({
      where: eq(membershipRequest.email, email),
    });

    if (data) {
      return errorResponse(
        res,
        "user with this Email has already requested",
        409
      );
    }
    next();
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// Middleware to check if user is verified
const checkUserVerified = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    // Fetch user by email
    const userData = await database.query.user.findFirst({
      where: eq(user.email, email),
      columns: { id: true, isActive: true },
    });

    if (!userData) {
      return unauthorizeResponse(res, "User not found");
    }

    if (!userData.isActive) {
      return unauthorizeResponse(
        res,
        "Your account has been deactivated, contact us for more details"
      );
    }

    next();
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export {
  authentication,
  checkUserAlreadyRegistered,
  checkUserAlreadyRequested,
  checkUserVerified,
};
