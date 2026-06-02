import { pgTable, serial, varchar, text, timestamp, index } from "drizzle-orm/pg-core";
import { leadStatusEnum } from "./enums";

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    companyName: varchar("company_name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    productName: varchar("product_name", { length: 255 }),
    sku: varchar("sku", { length: 100 }),
    category: varchar("category", { length: 255 }),
    quantity: varchar("quantity", { length: 100 }),
    location: varchar("location", { length: 255 }),
    message: text("message"),
    sourcePage: varchar("source_page", { length: 255 }),
    status: leadStatusEnum("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    emailIdx: index("lead_email_idx").on(table.email),
    statusIdx: index("lead_status_idx").on(table.status),
    createdAtIdx: index("lead_created_at_idx").on(table.createdAt),
    statusCreatedIdx: index("lead_status_created_idx").on(table.status, table.createdAt),
  })
);
