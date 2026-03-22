CREATE TABLE "settings_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"budget_total" numeric(10, 2)
);
--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "created_at" timestamp (6) with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "settings_table" ADD CONSTRAINT "settings_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;