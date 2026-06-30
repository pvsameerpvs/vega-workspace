import { relations } from "drizzle-orm";
import { categories, subcategories } from "./categories";
import { products } from "./products";
import { catalogs } from "./catalogs";
import { catalogCategories } from "./catalogCategories";
import { careers, jobApplications } from "./careers";

export const catalogRelations = relations(catalogs, ({ many }) => ({
  catalogCategories: many(catalogCategories),
}));

export const catalogCategoryRelations = relations(catalogCategories, ({ one }) => ({
  catalog: one(catalogs, {
    fields: [catalogCategories.catalogId],
    references: [catalogs.id],
  }),
  category: one(categories, {
    fields: [catalogCategories.categoryId],
    references: [categories.id],
  }),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
  products: many(products),
  catalogCategories: many(catalogCategories),
}));

export const subcategoryRelations = relations(subcategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
  products: many(products),
}));

export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.id],
  }),
}));

export const careerRelations = relations(careers, ({ many }) => ({
  applications: many(jobApplications),
}));

export const jobApplicationRelations = relations(jobApplications, ({ one }) => ({
  career: one(careers, {
    fields: [jobApplications.careerId],
    references: [careers.id],
  }),
}));
