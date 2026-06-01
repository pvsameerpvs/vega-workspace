import { pgTable, serial, varchar, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

export const careers = pgTable(
  "careers",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    titleAr: varchar("title_ar", { length: 255 }),
    department: varchar("department", { length: 100 }),
    location: varchar("location", { length: 255 }),
    jobType: varchar("job_type", { length: 100 }),
    experienceRequired: varchar("experience_required", { length: 255 }),
    description: text("description"),
    descriptionAr: text("description_ar"),
    requirements: text("requirements"),
    requirementsAr: text("requirements_ar"),
    salaryRange: varchar("salary_range", { length: 255 }),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    slugIdx: index("career_slug_idx").on(table.slug),
  })
);

export const jobApplications = pgTable(
  "job_applications",
  {
    id: serial("id").primaryKey(),
    careerId: integer("career_id").references(() => careers.id, { onDelete: "cascade" }),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    position: varchar("position", { length: 255 }).notNull(),
    experience: text("experience"),
    cvUrl: text("cv_url"),
    message: text("message"),
    status: varchar("status", { length: 50 }).notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    careerIdx: index("application_career_idx").on(table.careerId),
    emailIdx: index("application_email_idx").on(table.email),
  })
);
