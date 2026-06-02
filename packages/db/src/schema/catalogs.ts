import { pgTable, serial, varchar, text, boolean, timestamp, index } from "drizzle-orm/pg-core";

export const catalogs = pgTable(
  "catalogs",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    titleAr: varchar("title_ar", { length: 255 }),
    pdfFile: text("pdf_file").notNull(),
    coverImage: text("cover_image"),
    category: varchar("category", { length: 100 }),
    description: text("description"),
    descriptionAr: text("description_ar"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    categoryIdx: index("catalog_category_idx").on(table.category),
    activeCategoryIdx: index("catalog_active_category_idx").on(table.isActive, table.category),
  })
);
