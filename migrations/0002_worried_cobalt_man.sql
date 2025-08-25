CREATE TYPE "public"."type" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TABLE "transactions_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"account_id" text NOT NULL,
	"transaction_date" date,
	"description" varchar(256) NOT NULL,
	"amount" integer NOT NULL,
	"type" "type" NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	"updated_at" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "password" text NOT NULL;