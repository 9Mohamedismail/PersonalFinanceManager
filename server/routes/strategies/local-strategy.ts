import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { eq, or } from "drizzle-orm";
import { db } from "../../../src/db/db";
import { usersTable } from "../../../src/db/schema";

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "identifier", passwordField: "password" },
    async (username, password, done) => {
      try {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(
            or(
              eq(usersTable.username, `${username}`),
              eq(usersTable.email, `${username}`)
            )
          );

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
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
