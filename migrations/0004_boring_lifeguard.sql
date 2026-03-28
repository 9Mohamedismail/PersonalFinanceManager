ALTER TYPE "public"."auth" ADD VALUE 'github';--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "github_id" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_github_id_unique" UNIQUE("github_id");