ALTER TABLE "users_table" DROP CONSTRAINT "users_table_userName_unique";--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN "userName";--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_username_unique" UNIQUE("username");