import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const crowdZonesTable = pgTable("crowd_zones", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  level: text("level").notNull(),
  density: text("density").notNull(), // low, moderate, high, peak
  percentage: integer("percentage").notNull(),
});

export const gateStatusTable = pgTable("gate_status", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  waitMinutes: integer("wait_minutes").notNull().default(5),
  congestion: text("congestion").notNull().default("smooth"), // smooth, moderate, critical
  passengersPerMin: integer("passengers_per_min").notNull().default(10),
  fillPercent: integer("fill_percent").notNull().default(15),
});

export const amenityStatusTable = pgTable("amenity_status", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull().default("vacant"), // vacant, moderate, at_capacity
});

export type CrowdZone = typeof crowdZonesTable.$inferSelect;
export type GateStatus = typeof gateStatusTable.$inferSelect;
export type AmenityStatus = typeof amenityStatusTable.$inferSelect;
