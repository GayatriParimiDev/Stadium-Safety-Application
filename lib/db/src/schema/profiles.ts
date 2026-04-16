import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const profilesTable = pgTable("profiles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  guestId: text("guest_id").notNull(),
  tier: text("tier").notNull().default("Premium Guest"),
  section: text("section").notNull().default("A"),
  row: text("row").notNull().default("4"),
  seat: text("seat").notNull().default("12"),
  venue: text("venue").notNull().default("Grand Ballroom West"),
  wheelchairRoutes: boolean("wheelchair_routes").notNull().default(true),
  assistiveListening: boolean("assistive_listening").notNull().default(false),
  reducedSensoryZones: boolean("reduced_sensory_zones").notNull().default(true),
  topicInterests: text("topic_interests").array().notNull().default([]),
  cateringPreferences: text("catering_preferences").array().notNull().default([]),
});

export type Profile = typeof profilesTable.$inferSelect;
