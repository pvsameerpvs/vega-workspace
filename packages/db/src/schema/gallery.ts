import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

export const gallery = pgTable(
  "gallery",
  {
    id: serial("id").primaryKey(),
    image: text("image").notNull(),
    title: varchar("title", { length: 255 }),
    titleAr: varchar("title_ar", { length: 255 }),
    category: varchar("category", { length: 100 }),
    altText: varchar("alt_text", { length: 255 }),
    displayOrder: integer("display_order").default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    categoryIdx: index("gallery_category_idx").on(table.category),
    activeOrderIdx: index("gallery_active_order_idx").on(table.isActive, table.displayOrder),
  })
);
