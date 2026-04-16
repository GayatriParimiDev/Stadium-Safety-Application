import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const notificationsTable = pgTable("notifications", {
  id: text("id").primaryKey(),
  priority: text("priority").notNull().default("low"), // critical, high, medium, low
  title: text("title").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  isDismissed: boolean("is_dismissed").notNull().default(false),
  actionLabel: text("action_label"),
  actionRoute: text("action_route"),
});

export type Notification = typeof notificationsTable.$inferSelect;
