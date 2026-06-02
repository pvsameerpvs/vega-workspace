import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

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
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  activeCategoryIdx: index("faq_active_category_idx").on(table.isActive, table.category),
  activeOrderIdx: index("faq_active_order_idx").on(table.isActive, table.displayOrder),
}));
