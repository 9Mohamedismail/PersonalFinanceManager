CREATE TYPE "public"."auth" AS ENUM('local', 'google');--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "google_id" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "auth_provider" "auth" NOT NULL;