import { Router } from "express";
import { db } from "../../src/db/db";
import { eq, and, gte, lt, desc } from "drizzle-orm";
import { transactionsTable } from "../../src/db/schema";

const router = Router();

router.get("/transaction/all", async (req, res) => {
  const user = req.user as { id: number } | undefined;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, user.id));

    return res
      .status(200)
      .json({ message: "ALL User's transactions fetched", transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.get("/transaction", async (req, res) => {
  const user = req.user as { id: number } | undefined;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const period = String(req.query.period ?? "month");

  const now = new Date();
  let start: Date;
  let end: Date;

  if (period === "month") {
    start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
    end = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));
  } else if (period === "week") {
    const dayOfWeek = now.getUTCDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;
    const thisMonday = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() - daysSinceMonday
      )
    );

    start = new Date(thisMonday);
    start.setUTCDate(thisMonday.getUTCDate() - 7);
    end = thisMonday;
  } else {
    return res
      .status(400)
      .json({ message: "Invalid period. Use 'week' or 'month'" });
  }

  try {
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.userId, user.id),
          gte(transactionsTable.date, start),
          lt(transactionsTable.date, end)
        )
      );

    return res.status(200).json({
      message: `${period.toUpperCase()} User's transactions fetched`,
      transactions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.post("/transaction/add", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { accountId, date, description, amount, type, category, status } =
    req.body;

  if (
    !accountId ||
    !date ||
    !description ||
    !amount ||
    !type ||
    !category ||
    !status
  ) {
    return res.status(400).send("Required fields missing");
  }

  try {
    const [transaction] = await db
      .insert(transactionsTable)
      .values({
        userId: user.id,
        accountId: String(accountId),
        date: new Date(date),
        description,
        amount: String(amount),
        type: type.toLowerCase() as "income" | "expense",
        status: status.toLowerCase() as "pending" | "posted",
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return res.status(200).json({ message: "Transaction added!", transaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

export default router;
