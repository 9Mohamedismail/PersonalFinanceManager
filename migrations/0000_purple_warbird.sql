CREATE TYPE "public"."status" AS ENUM('pending', 'posted');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TABLE "accounts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"account_name" varchar(100) NOT NULL,
	"account_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"account_id" integer NOT NULL,
	"transaction_date" date,
	"description" varchar(256) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"type" "type" NOT NULL,
	"status" "status" NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp (6) with time zone NOT NULL,
	"updated_at" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_table_username_unique" UNIQUE("username"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accounts_table" ADD CONSTRAINT "accounts_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_table" ADD CONSTRAINT "transactions_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_table" ADD CONSTRAINT "transactions_table_account_id_accounts_table_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts_table"("id") ON DELETE no action ON UPDATE no action;