CREATE TYPE "public"."status" AS ENUM('pending', 'posted');--> statement-breakpoint
ALTER TABLE "transactions_table" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "transactions_table" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "transactions_table" ADD COLUMN "status" "status" NOT NULL;