CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"userName" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_userName_unique" UNIQUE("userName"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
