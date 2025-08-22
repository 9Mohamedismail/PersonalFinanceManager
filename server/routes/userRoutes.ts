import { Router } from "express";
import { db } from "../../src/db/db";
import passport from "passport";
import { usersTable } from "../../src/db/schema";

const router = Router();

router.post("/adduser", async (req, res) => {
  await db.insert(usersTable).values(req.body);
  return res.status(201).json({ message: "User added successfully" });
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

router.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
});

export default router;
