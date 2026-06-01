import { relations } from "drizzle-orm";
import { categories, subcategories } from "./categories";
import { products } from "./products";
import { careers } from "./careers";
import { jobApplications } from "./careers";

export const categoryRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
  products: many(products),
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
