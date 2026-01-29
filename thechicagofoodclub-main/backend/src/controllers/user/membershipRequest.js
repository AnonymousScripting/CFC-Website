import { successResponse, errorResponse } from "../../utils/customResponses.js";

import database from "../../../db/database.js";
import { membershipRequest } from "../../../db/schema/membershipRequest.js";

// Create Membership Request
const createMembershipRequest = async (req, res) => {
  try {
    const {
      email,
      fullName,
      phoneNumber,
      profession,
      professionalContribution,
      interestReason,
      culinarySkills,
      cuisineInterests,
      restaurantRecommendations,
      diningFrequency,
      availableDays,
      membershipGoals,
      cohostingInterest,
      referralSource,
      instagramUrl,
      linkedinUrl,
      dietaryRestrictions,
    } = req.body;

    const newRequest = await database
      .insert(membershipRequest)
      .values({
        email,
        fullName,
        phoneNumber,
        profession,
        professionalContribution,
        interestReason,
        culinarySkills,
        cuisineInterests,
        restaurantRecommendations,
        diningFrequency,
        availableDays,
        membershipGoals,
        cohostingInterest,
        referralSource,
        instagramUrl,
        linkedinUrl,
        dietaryRestrictions,
      })
      .returning();

    return successResponse(res, "Membership Request created Successfully!", {
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating membership request:", error);

    return errorResponse(res, error.message, 500);
  }
};

export { createMembershipRequest };
