import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

export const homeBanners = pgTable("home_banners", {
  id: serial("id").primaryKey(),
  image: text("image"),
  video: text("video"),
  title: varchar("title", { length: 255 }),
  titleAr: varchar("title_ar", { length: 255 }),
  subtitle: text("subtitle"),
  subtitleAr: text("subtitle_ar"),
  ctaText: varchar("cta_text", { length: 100 }),
  ctaTextAr: varchar("cta_text_ar", { length: 100 }),
  ctaLink: text("cta_link"),
  ctaSecondaryText: varchar("cta_secondary_text", { length: 100 }),
  ctaSecondaryTextAr: varchar("cta_secondary_text_ar", { length: 100 }),
  ctaSecondaryLink: text("cta_secondary_link"),
  displayOrder: integer("display_order").default(0),
  slideDuration: integer("slide_duration").default(6000),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  activeOrderIdx: index("banner_active_order_idx").on(table.isActive, table.displayOrder),
}));

export const homeVideos = pgTable("home_videos", {
  id: serial("id").primaryKey(),
  video: text("video").notNull(),
  title: varchar("title", { length: 255 }),
  titleAr: varchar("title_ar", { length: 255 }),
  category: varchar("category", { length: 100 }),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  activeOrderIdx: index("video_active_order_idx").on(table.isActive, table.displayOrder),
}));

export const counters = pgTable("counters", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 255 }).notNull(),
  labelAr: varchar("label_ar", { length: 255 }),
  value: varchar("value", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 100 }),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  activeOrderIdx: index("counter_active_order_idx").on(table.isActive, table.displayOrder),
}));

export const popularCategories = pgTable("popular_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }),
  image: text("image"),
  link: text("link"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  activeOrderIdx: index("popcat_active_order_idx").on(table.isActive, table.displayOrder),
}));

export const spotlightItems = pgTable("spotlight_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  titleAr: varchar("title_ar", { length: 255 }),
  subtitle: varchar("subtitle", { length: 255 }),
  subtitleAr: varchar("subtitle_ar", { length: 255 }),
  image: text("image"),
  link: text("link"),
  linkType: varchar("link_type", { length: 20 }).default("category"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  activeOrderIdx: index("spotlight_active_order_idx").on(table.isActive, table.displayOrder),
  linkTypeIdx: index("spotlight_link_type_idx").on(table.linkType, table.isActive),
}));
