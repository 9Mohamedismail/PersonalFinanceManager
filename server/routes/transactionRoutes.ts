import { Router } from "express";
import { db } from "../../src/db/db";
import { eq, and, gte, lte } from "drizzle-orm";
import { transactionsTable } from "../../src/db/schema";

const router = Router();

router.get("/transaction/all", async (req, res) => {
  const user = req.user;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, user.id));

    return res
      .status(200)
      .json({ message: "User's transactions fetched", transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/transaction/month", async (req, res) => {
  const user = req.user;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const now = new Date();
  const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
  const end = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));

  try {
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.userId, user.id),
          gte(transactionsTable.date, start),
          lte(transactionsTable.date, end)
        )
      );

    if (!transactions) {
      return res
        .status(200)
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
