import { Router } from "express";
import { db } from "@workspace/db";
import { crowdZonesTable, gateStatusTable, amenityStatusTable } from "@workspace/db";

const router = Router();

router.get("/zones", async (req, res) => {
  try {
    const zones = await db.select().from(crowdZonesTable);
    res.json(zones);
  } catch (err) {
    req.log.error({ err }, "Failed to get crowd zones");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/gates", async (req, res) => {
  try {
    const gates = await db.select().from(gateStatusTable);
    res.json(gates);
  } catch (err) {
    req.log.error({ err }, "Failed to get gate status");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/amenities", async (req, res) => {
  try {
    const amenities = await db.select().from(amenityStatusTable);
    res.json(amenities);
  } catch (err) {
    req.log.error({ err }, "Failed to get amenity status");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/forecast", async (req, res) => {
  try {
    res.json({
      gate: "Gate 02",
      forecastText: "System predicts a 15% increase in Gate 02 traffic at 14:00 due to Workshop Session conclusion in Hall C.",
      expectedIncreasePercent: 15,
      expectedAtTime: "14:00",
      reason: "Workshop Session conclusion in Hall C",
      validatedBy: "CORE AI v2.4",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get forecast");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
