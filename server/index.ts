import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import "./routes/strategies/local-strategy";
import session from "express-session";
import passport from "passport";

const app = express();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));

app.use(express.json());
app.use(
  session({
    secret: "personalFinanceManager", // change later on
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
