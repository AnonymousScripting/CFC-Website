import { z } from "zod";

const createRequestSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  phoneNumber: z.string().min(4),
  profession: z.string().min(2),
  professionalContribution: z.string(),
  interestReason: z.string(),
  culinarySkills: z.string(),
  cuisineInterests: z.string().min(1),
  restaurantRecommendations: z.string(),
  diningFrequency: z.string(),
  availableDays: z.array(z.string()),
  membershipGoals: z.array(z.string()),
  cohostingInterest: z.string(),
  referralSource: z.string(),
  instagramUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  dietaryRestrictions: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const respondToMembershipRequestSchema = z
  .object({
    adminId: z.string().uuid({ message: "Invalid adminId" }),
    action: z.enum(["approved", "rejected"], {
      errorMap: () => ({
        message: "Action must be 'approved' or 'rejected'",
      }),
    }),
    rejectionReason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.action === "rejected" && !data.rejectionReason) {
      ctx.addIssue({
        code: "custom",
        message: "Rejection reason is required when action is 'rejected'",
        path: ["rejectionReason"],
      });
    }
  });

const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters")
    .optional(),

  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
    .optional(),

  profilePicture: z
    .string()
    .url("Profile picture must be a valid URL")
    .optional(),

  profilePicturePath: z
    .string()
    .min(1, "Profile picture path cannot be empty")
    .optional(),

  linkedinUrl: z
    .string()
    .url("LinkedIn URL must be valid")
    .optional()
    .or(z.literal("")),

  instagramHandle: z
    .string()
    .max(100, "Instagram handle must be under 100 characters")
    .optional()
    .or(z.literal("")),

  discordHandle: z
    .string()
    .max(100, "Discord handle must be under 100 characters")
    .optional()
    .or(z.literal("")),
});

const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must be less than 100 characters"),

  email: z.string().email("Invalid email format"),

  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),

  interest: z.enum([
    "General Information",
    "Membership Application",
    "Upcoming Events",
    "Partnership Opportunities",
    "Other",
  ]),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

const changeVerificationStatusSchema = z.object({
  userId: z.string().uuid({ message: "Invalid userId format" }),
  isVerified: z.boolean({ required_error: "isVerified is required" }),
  reason: z.string().min(2, "Reason must be at least 2 characters").optional(),
});

export {
  createRequestSchema,
  loginSchema,
  respondToMembershipRequestSchema,
  editProfileSchema,
  contactSchema,
  changeVerificationStatusSchema,
};
