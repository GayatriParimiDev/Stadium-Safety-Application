import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const ordersTable = pgTable("orders", {
  id: text("id").primaryKey(),
  vendorId: text("vendor_id").notNull(),
  vendorName: text("vendor_name").notNull(),
  items: text("items").array().notNull().default([]),
  status: text("status").notNull().default("pending"), // pending, preparing, ready, collected
  pickupLocation: text("pickup_location").notNull(),
  estimatedMinutes: integer("estimated_minutes").notNull().default(10),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Order = typeof ordersTable.$inferSelect;
