import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user.js";

export const membershipStatusEnum = pgEnum("membership_status", [
  "pending",
  "approved",
  "rejected",
]);

const membershipRequest = pgTable("membership_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => user.id),
  email: varchar("email", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  profession: varchar("profession", { length: 100 }),
  professionalContribution: text("professional_contribution"),
  interestReason: text("interest_reason"),
  culinarySkills: text("culinary_skills"),
  cuisineInterests: text("cuisine_interests"),
  restaurantRecommendations: text("restaurant_recommendations"),
  diningFrequency: varchar("dining_frequency", { length: 50 }),
  availableDays: jsonb("available_days"),
  membershipGoals: jsonb("membership_goals"),
  cohostingInterest: varchar("cohosting_interest", { length: 50 }),
  referralSource: varchar("referral_source", { length: 50 }),
  instagramUrl: varchar("instagram_url", { length: 255 }),
  linkedinUrl: varchar("linkedin_url", { length: 255 }),
  dietaryRestrictions: text("dietary_restrictions"),

  // Approval fields
  status: membershipStatusEnum("membership_status")
    .default("pending")
    .notNull(),
  reviewedBy: uuid("reviewed_by").references(() => user.id),
  reviewedAt: timestamp("reviewed_at"),
  rejectionReason: text("rejection_reason"),
  createdAt: timestamp("created_at").defaultNow(),
});

const membershipRequestRelations = relations(membershipRequest, ({ one }) => ({
  user: one(user, {
    fields: [membershipRequest.userId],
    references: [user.id],
  }),
  reviewedByUser: one(user, {
    fields: [membershipRequest.reviewedBy],
    references: [user.id],
  }),
}));

export { membershipRequest, membershipRequestRelations };
