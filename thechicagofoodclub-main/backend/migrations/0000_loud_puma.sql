CREATE TABLE "blacklisttokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" varchar(255) NOT NULL,
	"expire_time" bigint
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar(255),
	"password" varchar DEFAULT null,
	"full_name" varchar NOT NULL,
	"otp" varchar(6),
	"profile_picture" varchar(255),
	"profile_picture_path" varchar(255),
	"is_verified" boolean DEFAULT false,
	"is_admin" boolean DEFAULT false,
	"last_login_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
