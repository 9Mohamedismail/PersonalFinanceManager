import { Router } from "express";
import { db } from "../../src/db/db";
import { eq } from "drizzle-orm";
import { transactionsTable } from "../../src/db/schema";

const router = Router();

router.get("/transaction", async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User's id is missing" });
  }

  try {
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, user.id));

    if (!transactions) {
      return res
        .status(404)
        .json({ message: "User has no transactions or fetching failed" });
    }

    return res
      .status(200)
      .json({ message: "User's transactions fetched", transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
