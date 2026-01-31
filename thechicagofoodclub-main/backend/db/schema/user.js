import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { membershipRequest } from "./membershipRequest.js";

const user = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email").notNull().unique(),
  phone: varchar("phone", { length: 255 }),
  password: varchar("password").default(null),
  fullName: varchar("full_name").notNull(),
  otp: varchar("otp", { length: 6 }),
  profilePicture: varchar("profile_picture", { length: 255 }),
  profilePicturePath: varchar("profile_picture_path", { length: 255 }),
  isVerified: boolean("is_verified").default(false),
  isAdmin: boolean("is_admin").default(false),
  isTemporaryPassword: boolean("is_temporary_password").default(false),
  lastLoginAt: timestamp("last_login_at").defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  isActive: boolean("is_active").default(true),
});

const userRelations = relations(user, ({ one, many }) => ({
  membershipRequests: one(membershipRequest),
  reviewedRequests: many(membershipRequest, {
    relationName: "reviewedByUser",
  }),
}));

export { user, userRelations };
