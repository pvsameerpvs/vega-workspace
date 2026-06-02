import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    nameAr: varchar("name_ar", { length: 255 }),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    descriptionAr: text("description_ar"),
    image: text("image"),
    banner: text("banner"),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    displayOrder: integer("display_order").default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    slugIdx: index("category_slug_idx").on(table.slug),
    activeOrderIdx: index("category_active_order_idx").on(table.isActive, table.displayOrder),
  })
);

export const subcategories = pgTable(
  "subcategories",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    nameAr: varchar("name_ar", { length: 255 }),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    descriptionAr: text("description_ar"),
    image: text("image"),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    displayOrder: integer("display_order").default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    slugIdx: index("subcategory_slug_idx").on(table.slug),
    categoryIdx: index("subcategory_category_idx").on(table.categoryId),
    activeCategoryOrderIdx: index("subcategory_active_cat_order_idx").on(table.isActive, table.categoryId, table.displayOrder),
  })
);
