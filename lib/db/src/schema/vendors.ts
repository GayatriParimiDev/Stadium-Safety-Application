import { pgTable, text, integer, real, boolean } from "drizzle-orm/pg-core";

export const vendorsTable = pgTable("vendors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  zone: text("zone").notNull(),
  rating: real("rating").notNull().default(4.5),
  waitMinutes: integer("wait_minutes").notNull().default(10),
  waitTrend: text("wait_trend").notNull().default("stable"), // decreasing, stable, increasing
  isInstantPickup: boolean("is_instant_pickup").notNull().default(false),
  description: text("description"),
});

export const menuItemsTable = pgTable("menu_items", {
  id: text("id").primaryKey(),
  vendorId: text("vendor_id").notNull().references(() => vendorsTable.id),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
});

export type Vendor = typeof vendorsTable.$inferSelect;
export type MenuItem = typeof menuItemsTable.$inferSelect;
