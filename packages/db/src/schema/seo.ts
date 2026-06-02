import { pgTable, serial, varchar, text, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { languageEnum } from "./enums";

export const seoMeta = pgTable(
  "seo_meta",
  {
    id: serial("id").primaryKey(),
    page: varchar("page", { length: 255 }).notNull(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    focusKeyword: varchar("focus_keyword", { length: 255 }),
    slug: varchar("slug", { length: 255 }),
    imageAlt: text("image_alt"),
    canonicalUrl: text("canonical_url"),
    ogTitle: varchar("og_title", { length: 255 }),
    ogImage: text("og_image"),
    language: languageEnum("language").default("en"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    pageIdx: index("seo_page_idx").on(table.page),
    pageLangUnique: uniqueIndex("seo_page_lang_unique").on(table.page, table.language),
  })
);

export const translations = pgTable(
  "translations",
  {
    id: serial("id").primaryKey(),
    key: varchar("key", { length: 255 }).notNull(),
    language: languageEnum("language").notNull().default("en"),
    value: text("value").notNull(),
    group: varchar("group", { length: 100 }).default("general"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    keyLangUnique: uniqueIndex("translation_key_lang_unique").on(table.key, table.language),
    groupKeyIdx: index("translation_group_key_idx").on(table.group, table.key),
  })
);
