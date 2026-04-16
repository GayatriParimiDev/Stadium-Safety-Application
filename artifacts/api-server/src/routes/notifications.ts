import { Router } from "express";
import { db } from "@workspace/db";
import { notificationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const notifications = await db
      .select()
      .from(notificationsTable)
      .orderBy(notificationsTable.timestamp);

    res.json(notifications.map(n => ({
      id: n.id,
      priority: n.priority,
      title: n.title,
      message: n.message,
      timestamp: n.timestamp.toISOString(),
      isDismissed: n.isDismissed,
      actionLabel: n.actionLabel ?? undefined,
      actionRoute: n.actionRoute ?? undefined,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to get notifications");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:notificationId/dismiss", async (req, res) => {
  try {
    const { notificationId } = req.params;
    const [updated] = await db
      .update(notificationsTable)
      .set({ isDismissed: true })
      .where(eq(notificationsTable.id, notificationId))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Notification not found" });
      return;
    }

    res.json({
      id: updated.id,
      priority: updated.priority,
      title: updated.title,
      message: updated.message,
      timestamp: updated.timestamp.toISOString(),
      isDismissed: updated.isDismissed,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to dismiss notification");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
