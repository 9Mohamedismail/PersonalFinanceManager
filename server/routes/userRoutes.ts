import { Router } from "express";
import { db } from "../../src/db/db";
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
      .values({ username, email, password: await hashPassword(password) })
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
    if (err?.code === "23505") {
      const detail = err.detail || "";
      if (detail.includes("(username)")) {
        return res.status(409).json({ error: "Username already exists" });
      }
      if (detail.includes("(email)")) {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(409).json({ error: "User already exists" });
    }
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

export default router;
