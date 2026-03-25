import { Router } from "express";
import { db } from "../../src/db/db";
import { eq } from "drizzle-orm";
import { settingsTable } from "../../src/db/schema";

const router = Router();

router.get("/settings", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const [settings] = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.userId, user.id));

    return res.status(200).json({
      message: "User's settings fetched",
      payload: settings,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

router.put("/settings/update", async (req, res) => {
  const user = req.user as { id: number } | undefined;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { budgetTotal } = req.body;

  if (
    budgetTotal === undefined ||
    budgetTotal === null ||
    Number(budgetTotal) < 0
  ) {
    return res
      .status(400)
      .json({ message: "budgetTotal must be 0 or greater" });
  }

  try {
    const [settings] = await db
      .update(settingsTable)
      .set({
        userId: user.id,
        budgetTotal: budgetTotal,
      })
      .where(eq(settingsTable.userId, user.id))
      .returning();

    return res.status(200).json({
      message: "Settings updated!",
      settings: {
        ...settings,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", err: err });
  }
});

export default router;
