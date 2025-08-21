import { Router } from "express";
import { db } from "../../src/db/db";
import { usersTable } from "../../src/db/schema";

const router = Router();

router.post("/adduser", async (req, res) => {
  await db.insert(usersTable).values(req.body);
  return res.status(201).json({ message: "User added successfully" });
});

export default router;
