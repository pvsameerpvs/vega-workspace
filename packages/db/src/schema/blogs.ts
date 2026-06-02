import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { publishStatusEnum, languageEnum } from "./enums";

export const blogs = pgTable(
  "blogs",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    titleAr: varchar("title_ar", { length: 255 }),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    featuredImage: text("featured_image"),
    category: varchar("category", { length: 100 }),
    author: varchar("author", { length: 255 }),
    excerpt: text("excerpt"),
    excerptAr: text("excerpt_ar"),
    content: text("content"),
    contentAr: text("content_ar"),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    focusKeyword: varchar("focus_keyword", { length: 255 }),
    language: languageEnum("language").default("en"),
    publishDate: timestamp("publish_date", { withTimezone: true }).defaultNow(),
    status: publishStatusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    slugIdx: index("blog_slug_idx").on(table.slug),
    statusIdx: index("blog_status_idx").on(table.status),
    statusPublishIdx: index("blog_status_publish_idx").on(table.status, table.publishDate),
    statusCategoryIdx: index("blog_status_category_idx").on(table.status, table.category),
  })
);
