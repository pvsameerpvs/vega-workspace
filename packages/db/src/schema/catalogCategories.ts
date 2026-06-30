import { pgTable, serial, integer, uniqueIndex } from "drizzle-orm/pg-core";
import { catalogs } from "./catalogs";
import { categories } from "./categories";

export const catalogCategories = pgTable(
  "catalog_categories",
  {
    id: serial("id").primaryKey(),
    catalogId: integer("catalog_id")
      .notNull()
      .references(() => catalogs.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    catalogCategoryIdx: uniqueIndex("catalog_category_unique_idx").on(table.catalogId, table.categoryId),
  })
);
