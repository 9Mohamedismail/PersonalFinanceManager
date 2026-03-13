import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { and, eq, or } from "drizzle-orm";
import { db } from "../../../src/db/db";
import { usersTable } from "../../../src/db/schema";
import { comparePassword } from "../../utils/helpers";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL!,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) return done(new Error("No email"));

        let [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.google_id, `${profile.id}`))
          .limit(1);

        if (user) return done(null, user);

        const [emailUser] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        if (emailUser) {
          return done(null, false, {
            message: "Account exists. Log in to link Google.",
          });
        }

        if (!user) {
          [user] = await db
            .insert(usersTable)
            .values({
              username: profile.displayName.toLowerCase(),
              email,
              password: null,
              google_id: profile.id,
              auth_provider: "google",
            })
            .returning();
        }

        console.log(accessToken);
        console.log(refreshToken);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
