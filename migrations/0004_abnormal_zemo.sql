ALTER TABLE "users_table" DROP CONSTRAINT "users_table_github_id_unique";--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "auth_provider" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."auth";--> statement-breakpoint
CREATE TYPE "public"."auth" AS ENUM('local', 'google');--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "auth_provider" SET DATA TYPE "public"."auth" USING "auth_provider"::"public"."auth";--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN "github_id";