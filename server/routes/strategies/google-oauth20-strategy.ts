import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { eq } from "drizzle-orm";
import { db } from "../../../src/db/db";
import { settingsTable, usersTable } from "../../../src/db/schema";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL!,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email provided by Google"));
        }

        let [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.google_id, profile.id))
          .limit(1);

        if (user) {
          return done(null, user);
        }

        const [emailUser] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        if (emailUser) {
          return done(null, false, {
            message: "Account with that email already exists.",
          });
        }

        const baseUsername = profile.displayName
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z0-9_]/g, "");

        const generatedUsername = `${baseUsername}_${profile.id}`;

        [user] = await db
          .insert(usersTable)
          .values({
            username: generatedUsername,
            email,
            password: null,
            google_id: profile.id,
            auth_provider: "google",
            createdAt: new Date(),
          })
          .returning();

        await db
          .insert(settingsTable)
          .values({
            userId: user.id,
            budgetTotal: null,
          })
          .returning();

        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    },
  ),
);
