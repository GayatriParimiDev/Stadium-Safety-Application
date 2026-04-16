import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable, notificationsTable, gateStatusTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/event", async (req, res) => {
  try {
    const events = await db.select().from(eventsTable).limit(1);
    if (events.length === 0) {
      res.status(404).json({ error: "No event found" });
      return;
    }
    const ev = events[0];
    res.json({
      id: ev.id,
      name: "IPL 2026 Finals",
      stage: "IPL 2026",
      homeTeam: "Gujarat Titans",
      awayTeam: "Chennai Super Kings",
      homeScore: 189,
      awayScore: 185,
      minute: 19,
      isLive: true,
      possession: ev.possession,
      atmosphereDb: 112,
      weatherCelsius: 30,
      userSection: "Presidential Suite",
      userRow: "A",
      userSeat: "1",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get event status");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const alerts = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.isDismissed, false));

    const gates = await db.select().from(gateStatusTable);
    const totalPassengers = gates.reduce((sum, g) => sum + g.passengersPerMin, 0);
    const avgEntry = gates.length > 0 ? parseFloat((totalPassengers / gates.length / 10).toFixed(1)) : 4.2;

    const criticalAlerts = alerts.filter(a => a.priority === "critical" || a.priority === "high");

    res.json({
      totalAttendance: 12482,
      attendanceChange: 14,
      avgGateEntryMinutes: avgEntry,
      gateEntryStatus: avgEntry < 8 ? "OPTIMAL" : "CONGESTED",
      activeAlerts: criticalAlerts.length,
      alertImpact: criticalAlerts.length > 0 ? "IMPACT HIGH" : "NOMINAL",
      systemHealth: 99.8,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get dashboard stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
