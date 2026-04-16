import { Router } from "express";
import { db } from "@workspace/db";
import { vendorsTable, menuItemsTable, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { PlaceOrderBody } from "@workspace/api-zod";
import crypto from "crypto";

const router = Router();

router.get("/vendors", async (req, res) => {
  try {
    const { category } = req.query;
    let vendors;
    if (category && typeof category === "string" && category !== "All Vendors") {
      vendors = await db.select().from(vendorsTable).where(eq(vendorsTable.category, category));
    } else {
      vendors = await db.select().from(vendorsTable);
    }
    res.json(vendors.map(v => ({
      id: v.id,
      name: v.name,
      category: v.category,
      zone: v.zone,
      rating: v.rating,
      waitMinutes: v.waitMinutes,
      waitTrend: v.waitTrend,
      isInstantPickup: v.isInstantPickup,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to get vendors");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/vendors/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendors = await db.select().from(vendorsTable).where(eq(vendorsTable.id, vendorId));
    if (vendors.length === 0) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    const vendor = vendors[0];
    const menuItems = await db.select().from(menuItemsTable).where(eq(menuItemsTable.vendorId, vendorId));
    res.json({
      ...vendor,
      menuItems: menuItems.map(m => ({
        id: m.id,
        name: m.name,
        price: m.price,
        description: m.description,
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get vendor by id");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/pickup-windows", async (req, res) => {
  try {
    const windows = [
      { timeLabel: "12:00", busynessLevel: 3, isOptimal: false },
      { timeLabel: "12:30", busynessLevel: 5, isOptimal: false },
      { timeLabel: "13:00", busynessLevel: 8, isOptimal: false },
      { timeLabel: "13:30", busynessLevel: 10, isOptimal: true },
      { timeLabel: "14:00", busynessLevel: 9, isOptimal: false },
      { timeLabel: "14:30", busynessLevel: 6, isOptimal: false },
      { timeLabel: "15:00", busynessLevel: 4, isOptimal: false },
      { timeLabel: "15:30", busynessLevel: 2, isOptimal: false },
      { timeLabel: "16:00", busynessLevel: 3, isOptimal: false },
    ];
    res.json(windows);
  } catch (err) {
    req.log.error({ err }, "Failed to get pickup windows");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable);
    res.json(orders.map(o => ({
      id: o.id,
      vendorId: o.vendorId,
      vendorName: o.vendorName,
      items: o.items,
      status: o.status,
      pickupLocation: o.pickupLocation,
      estimatedMinutes: o.estimatedMinutes,
      createdAt: o.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to get orders");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const parsed = PlaceOrderBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
      return;
    }
    const { vendorId, items } = parsed.data;

    const vendors = await db.select().from(vendorsTable).where(eq(vendorsTable.id, vendorId));
    if (vendors.length === 0) {
      res.status(404).json({ error: "Vendor not found" });
      return;
    }
    const vendor = vendors[0];

    const itemIds = items.map(i => i.menuItemId);
    const orderId = crypto.randomUUID();

    const [order] = await db.insert(ordersTable).values({
      id: orderId,
      vendorId,
      vendorName: vendor.name,
      items: itemIds,
      status: "pending",
      pickupLocation: `Stand ${vendor.zone}`,
      estimatedMinutes: vendor.waitMinutes,
      createdAt: new Date(),
    }).returning();

    res.status(201).json({
      id: order.id,
      vendorId: order.vendorId,
      vendorName: order.vendorName,
      items: order.items,
      status: order.status,
      pickupLocation: order.pickupLocation,
      estimatedMinutes: order.estimatedMinutes,
      createdAt: order.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to place order");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
