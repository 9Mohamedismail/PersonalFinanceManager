import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { eq, or } from "drizzle-orm";
import { db } from "../../../src/db/db";
import { usersTable } from "../../../src/db/schema";
import { comparePassword } from "../../utils/helpers";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ["email", "profile"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(
            or(
              eq(usersTable.username, `${profile.id}`),
              eq(usersTable.email, `${profile.id}`)
            )
          )
          .limit(1);

        if (!user) {
          return done(null, false, { message: "Google OAuth failed" });
        }

        /*if (!(await comparePassword(password, user.password))) {
          return done(null, false, { message: "Incorrect password" });
        }*/
        return done(null, user);
      } catch (err) {}
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
