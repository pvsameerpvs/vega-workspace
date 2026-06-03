import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }),
  designation: varchar("designation", { length: 255 }),
  designationAr: varchar("designation_ar", { length: 255 }),
  department: varchar("department", { length: 100 }),
  photo: text("photo"),
  bio: text("bio"),
  bioAr: text("bio_ar"),
  email: varchar("email", { length: 255 }),
  linkedIn: text("linked_in"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  activeOrderIdx: index("team_active_order_idx").on(table.isActive, table.displayOrder),
}));
