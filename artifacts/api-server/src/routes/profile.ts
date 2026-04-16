import { Router } from "express";
import { db } from "@workspace/db";
import { profilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateProfileBody } from "@workspace/api-zod";

const router = Router();

const DEFAULT_PROFILE_ID = "user-001";

router.get("/", async (req, res) => {
  try {
    const profiles = await db.select().from(profilesTable).where(eq(profilesTable.id, DEFAULT_PROFILE_ID));
    if (profiles.length === 0) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }
    const p = profiles[0];
    res.json({
      id: p.id,
      name: p.name,
      guestId: p.guestId,
      tier: p.tier,
      section: p.section,
      row: p.row,
      seat: p.seat,
      venue: p.venue,
      wheelchairRoutes: p.wheelchairRoutes,
      assistiveListening: p.assistiveListening,
      reducedSensoryZones: p.reducedSensoryZones,
      topicInterests: p.topicInterests,
      cateringPreferences: p.cateringPreferences,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/", async (req, res) => {
  try {
    const parsed = UpdateProfileBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
      return;
    }

    const updateData: Record<string, unknown> = {};
    if (parsed.data.wheelchairRoutes !== undefined) updateData.wheelchairRoutes = parsed.data.wheelchairRoutes;
    if (parsed.data.assistiveListening !== undefined) updateData.assistiveListening = parsed.data.assistiveListening;
    if (parsed.data.reducedSensoryZones !== undefined) updateData.reducedSensoryZones = parsed.data.reducedSensoryZones;
    if (parsed.data.topicInterests !== undefined) updateData.topicInterests = parsed.data.topicInterests;
    if (parsed.data.cateringPreferences !== undefined) updateData.cateringPreferences = parsed.data.cateringPreferences;

    const [updated] = await db
      .update(profilesTable)
      .set(updateData)
      .where(eq(profilesTable.id, DEFAULT_PROFILE_ID))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.json({
      id: updated.id,
      name: updated.name,
      guestId: updated.guestId,
      tier: updated.tier,
      section: updated.section,
      row: updated.row,
      seat: updated.seat,
      venue: updated.venue,
      wheelchairRoutes: updated.wheelchairRoutes,
      assistiveListening: updated.assistiveListening,
      reducedSensoryZones: updated.reducedSensoryZones,
      topicInterests: updated.topicInterests,
      cateringPreferences: updated.cateringPreferences,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
