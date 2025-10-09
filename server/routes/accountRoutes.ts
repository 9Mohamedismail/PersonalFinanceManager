import { Router } from "express";
import { db } from "../../src/db/db";
import { eq, and, gte, lt, desc, sql } from "drizzle-orm";
import { accountsTable, transactionsTable } from "../../src/db/schema";

const router = Router();

router.get("/accounts", async (req, res) => {
  const user = req.user as { id: number } | undefined;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const accounts = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.userId, user.id));

    return res.status(200).json({
      message: "All user's accounts fetched",
      payload: accounts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.get("/accounts/with-count", async (req, res) => {
  const user = req.user as { id: number } | undefined;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const accountsWithCounts = await db
      .select({
        id: accountsTable.id,
        accountName: accountsTable.accountName,
        accountType: accountsTable.accountType,
        transactionCount: sql<number>`COUNT(${transactionsTable.id})`,
      })
      .from(accountsTable)
      .leftJoin(
        transactionsTable,
        eq(transactionsTable.accountId, accountsTable.id)
      )
      .where(eq(accountsTable.userId, user.id))
      .groupBy(accountsTable.id);

    return res.status(200).json({
      message: "Accounts with transaction count fetched successfully",
      payload: accountsWithCounts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.post("/accounts/add", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { accountName, accountType } = req.body;

  if (!accountName || !accountType) {
    return res.status(400).send("Required fields missing");
  }

  try {
    const count = await db
      .select({ count: sql<number>`count(*)` })
      .from(accountsTable)
      .where(eq(accountsTable.userId, user.id));

    if (count[0].count >= 6) {
      return res
        .status(400)
        .json({ message: "You can only have up to 6 accounts" });
    }

    const existing = await db
      .select()
      .from(accountsTable)
      .where(
        and(
          eq(accountsTable.userId, user.id),
          eq(accountsTable.accountName, accountName)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Account with that name already exists" });
    }

    const [account] = await db
      .insert(accountsTable)
      .values({
        userId: user.id,
        accountName: accountName.toLowerCase(),
        accountType: accountType,
      })
      .returning();

    return res.status(200).json({ message: "Account added!", account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.put("/accounts/update/:id", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (!req.params.id) {
    return res.status(400).send("account id not provided");
  }

  const { accountName, accountType } = req.body;

  if (!accountName || !accountType) {
    return res.status(400).send("Required fields missing");
  }

  try {
    const existing = await db
      .select()
      .from(accountsTable)
      .where(
        and(
          eq(accountsTable.userId, user.id),
          eq(accountsTable.accountName, accountName.toLowerCase()),
          sql`${accountsTable.id} <> ${req.params.id}`
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Account with that name already exists" });
    }

    const [account] = await db
      .update(accountsTable)
      .set({
        userId: user.id,
        accountName: accountName.toLowerCase(),
        accountType: accountType,
      })
      .where(eq(accountsTable.id, Number(req.params.id)))
      .returning();

    return res.status(200).json({ message: "Account updated!", account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.delete("/accounts/delete/:id", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const accountId = Number(req.params.id);
  if (isNaN(accountId)) {
    return res.status(400).json({ message: "Invalid account ID." });
  }

  try {
    const account = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.id, accountId))
      .limit(1);

    if (!account.length || account[0].userId !== user.id) {
      return res
        .status(404)
        .json({ message: "Account not found or unauthorized." });
    }

    await db
      .delete(transactionsTable)
      .where(eq(transactionsTable.accountId, accountId));

    const [deletedAccount] = await db
      .delete(accountsTable)
      .where(eq(accountsTable.id, accountId))
      .returning();

    return res.status(200).json({
      message: "Account and related transactions deleted successfully!",
      account: deletedAccount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

export default router;
