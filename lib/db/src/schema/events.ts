import { pgTable, text, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  stage: text("stage").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  homeScore: integer("home_score").notNull().default(0),
  awayScore: integer("away_score").notNull().default(0),
  minute: integer("minute").notNull().default(0),
  isLive: boolean("is_live").notNull().default(true),
  possession: real("possession").notNull().default(50),
  atmosphereDb: real("atmosphere_db").notNull().default(80),
  weatherCelsius: real("weather_celsius").notNull().default(22),
  userSection: text("user_section").notNull().default("A-12"),
  userRow: text("user_row").notNull().default("4"),
  userSeat: text("user_seat").notNull().default("22"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Event = typeof eventsTable.$inferSelect;
