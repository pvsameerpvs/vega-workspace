import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "product_manager",
  "content_editor",
  "hr_manager",
  "sales_team",
]);

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "published",
  "archived",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "quotation_sent",
  "follow_up_required",
  "closed",
  "lost",
]);

export const languageEnum = pgEnum("language", ["en", "ar"]);
