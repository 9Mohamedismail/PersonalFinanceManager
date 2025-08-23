import { Router } from "express";
import { db } from "../../src/db/db";
import { eq, and } from "drizzle-orm";
import passport from "passport";
import { usersTable } from "../../src/db/schema";
import { hashPassword } from "../utils/helpers";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body as {
      username?: string;
      email?: string;
      password?: string;
    };

    if (!username || !email || !password) {
      return res.status(400).send("Required fields missing");
    }

    const [user] = await db
      .insert(usersTable)
      .values({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: await hashPassword(password),
      })
      .returning();

    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(201).json({
        message: "User added successfully",
        id: user.id,
        username: user.username,
        email: user.email,
      });
    });
  } catch (err: any) {
    const code = err?.code ?? err?.cause?.code;
    const detail = err?.detail ?? err?.cause?.detail ?? "";
    const constraint = err?.constraint ?? err?.cause?.constraint;

    if (code === "23505") {
      if (
        constraint === "users_table_username_unique" ||
        detail.includes("(username)")
      ) {
        return res.status(409).json({ error: "Username already exists" });
      }
      if (
        constraint === "users_table_email_unique" ||
        detail.includes("(email)")
      ) {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(409).json({ error: "User already exists" });
    }
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    (err: any, user: any, info: { message?: string }) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || "Authentication failed" });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res
          .status(200)
          .json({
            message: "Logged in successfully",
            user: { id: user.id, username: user.username, email: user.email },
          });
      });
    }
  )(req, res, next);
});

router.post("/user/by-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({ message: "User email not sent" });
  }

  try {
    const [user] = await db
      .select({ username: usersTable.username })
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User fetched", username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/user", async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res
      .status(404)
      .json({ message: "User's email or password is missing" });
  }

  try {
    const [user] = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(
        and(
          eq(usersTable.username, username.toLowerCase()),
          eq(usersTable.email, email.toLowerCase())
        )
      )
      .limit(1);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User fetched", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/user/reset", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(404)
      .json({ message: "User's email or new password is missing" });
  }

  try {
    const [user] = await db
      .update(usersTable)
      .set({ password: await hashPassword(newPassword) })
      .where(eq(usersTable.email, email.toLowerCase()))
      .returning({ id: usersTable.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User's password has been updated", userId: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/user/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  return res.status(200).json({ user: req.user });
});

export default router;
