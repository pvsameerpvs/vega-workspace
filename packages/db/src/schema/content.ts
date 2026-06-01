import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { productStatusEnum, languageEnum } from "./enums";

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
    status: productStatusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    slugIdx: index("blog_slug_idx").on(table.slug),
    statusIdx: index("blog_status_idx").on(table.status),
  })
);

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
  },
  (table) => ({
    categoryIdx: index("gallery_category_idx").on(table.category),
  })
);

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
  },
  (table) => ({
    categoryIdx: index("catalog_category_idx").on(table.category),
  })
);

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 255 }),
  department: varchar("department", { length: 100 }),
  photo: text("photo"),
  bio: text("bio"),
  bioAr: text("bio_ar"),
  email: varchar("email", { length: 255 }),
  linkedIn: text("linked_in"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  questionAr: text("question_ar"),
  answer: text("answer").notNull(),
  answerAr: text("answer_ar"),
  category: varchar("category", { length: 100 }),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const industries = pgTable("industries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }),
  icon: varchar("icon", { length: 100 }),
  description: text("description"),
  descriptionAr: text("description_ar"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
