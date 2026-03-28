import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login?error=google_auth_failed",
    session: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  },
);

export default router;
