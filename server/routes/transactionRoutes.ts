import { Router } from "express";
import { db } from "../../src/db/db";
import { eq, and, gte, lt, desc } from "drizzle-orm";
import { transactionsTable } from "../../src/db/schema";

const router = Router();

const toPayload = (transactions: any[]) =>
  transactions.map((transaction) => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));

const validateTransaction = (body: any) => {
  const { accountId, date, description, amount, type, category, status } = body;
  if (
    !accountId ||
    !date ||
    !description ||
    amount === undefined ||
    !type ||
    !category ||
    !status
  ) {
    return false;
  }
  return true;
};

router.get("/transaction", async (req, res) => {
  const user = req.user as { id: number } | undefined;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const period = String(req.query.period ?? "month");

  const now = new Date();
  let start: Date, end: Date;

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
      message: `${period.toUpperCase()} user's transactions fetched`,
      payload: toPayload(transactions),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.get("/transaction/all", async (req, res) => {
  const user = req.user as { id: number } | undefined;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, user.id));

    return res.status(200).json({
      message: "All user's transactions fetched",
      payload: toPayload(transactions),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.post("/transaction/add", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (!validateTransaction(req.body)) {
    return res.status(400).send("Required fields missing");
  }

  try {
    const [transaction] = await db
      .insert(transactionsTable)
      .values({
        userId: user.id,
        accountId: req.body.accountId,
        date: new Date(req.body.date),
        description: req.body.description,
        amount: String(req.body.amount),
        type: req.body.type.toLowerCase() as "income" | "expense",
        status: req.body.status.toLowerCase() as "pending" | "posted",
        category: req.body.category,
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

router.put("/transaction/update/:id", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (!req.params.id) {
    return res.status(400).send("Transaction id not provided");
  }

  if (!validateTransaction(req.body)) {
    return res.status(400).send("Required fields missing");
  }

  try {
    const [transaction] = await db
      .update(transactionsTable)
      .set({
        userId: user.id,
        accountId: req.body.accountId,
        date: new Date(req.body.date),
        description: req.body.description,
        amount: String(req.body.amount),
        type: req.body.type.toLowerCase() as "income" | "expense",
        status: req.body.status.toLowerCase() as "pending" | "posted",
        category: req.body.category,
        updatedAt: new Date(),
      })
      .where(eq(transactionsTable.id, Number(req.params.id)))
      .returning();

    return res
      .status(200)
      .json({ message: "Transaction updated!", transaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.delete("/transaction/delete/:id", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (!req.params.id) {
    return res.status(400).send("Transaction id not provided");
  }

  try {
    const [transaction] = await db
      .delete(transactionsTable)
      .where(eq(transactionsTable.id, Number(req.params.id)))
      .returning();

    return res
      .status(200)
      .json({ message: "Transaction deleted! ", transaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

export default router;
