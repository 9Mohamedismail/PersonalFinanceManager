import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", (req, res, next) => {
  passport.authenticate(
    "google",
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
        return res.status(200).json({
          message: "Logged in successfully",
          user: { id: user.id, username: user.username, email: user.email },
        });
      });
    }
  )(req, res, next);
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send(200);
});

export default router;
