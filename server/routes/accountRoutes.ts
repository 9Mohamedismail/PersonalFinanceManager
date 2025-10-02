import { Router } from "express";
import { db } from "../../src/db/db";
import { eq, and, gte, lt, desc } from "drizzle-orm";
import { accountsTable } from "../../src/db/schema";

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

router.post("/accounts/add", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

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
        accountType: accountType.toLowerCase(),
      })
      .returning();

    return res.status(200).json({ message: "Account added!", account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

export default router;
