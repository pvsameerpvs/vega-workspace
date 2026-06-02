import { pgTable, serial, varchar, text, timestamp, index } from "drizzle-orm/pg-core";

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  group: varchar("group", { length: 100 }).notNull().default("general"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  groupKeyIdx: index("settings_group_key_idx").on(table.group, table.key),
}));
