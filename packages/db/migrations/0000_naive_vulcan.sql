DO $$ BEGIN
 CREATE TYPE "public"."application_status" AS ENUM('new', 'contacted', 'reviewing', 'shortlisted', 'interviewed', 'accepted', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."language" AS ENUM('en', 'ar');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'quotation_sent', 'follow_up_required', 'closed', 'lost');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."product_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."publish_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'product_manager', 'content_editor', 'hr_manager', 'sales_team');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'sales_team' NOT NULL,
	"avatar" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text,
	"group" varchar(100) DEFAULT 'general' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"name_ar" varchar(255),
	"slug" varchar(255) NOT NULL,
	"description" text,
	"description_ar" text,
	"image" text,
	"banner" text,
	"seo_title" varchar(255),
	"seo_description" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subcategories" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"name_ar" varchar(255),
	"slug" varchar(255) NOT NULL,
	"description" text,
	"description_ar" text,
	"image" text,
	"seo_title" varchar(255),
	"seo_description" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "subcategories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"name_ar" varchar(255),
	"slug" varchar(255) NOT NULL,
	"sku" varchar(100) NOT NULL,
	"category_id" integer NOT NULL,
	"subcategory_id" integer,
	"short_description" text,
	"short_description_ar" text,
	"full_description" text,
	"full_description_ar" text,
	"color" varchar(100),
	"design" varchar(100),
	"weight" varchar(100),
	"dimensions" varchar(100),
	"material" varchar(100),
	"fitting_type" varchar(100),
	"features" text,
	"features_ar" text,
	"warranty" varchar(255),
	"brand" varchar(100),
	"country" varchar(100),
	"availability_status" varchar(100),
	"price" integer,
	"show_price" boolean DEFAULT false,
	"delivery_info" text,
	"installation" text,
	"bulk_available" boolean DEFAULT false,
	"wholesale_note" text,
	"bulk_quantity_note" text,
	"wholesale_discount_note" text,
	"delivery_available" boolean DEFAULT false,
	"installation_available" boolean DEFAULT false,
	"main_image" text,
	"gallery" jsonb,
	"is_featured" boolean DEFAULT false,
	"is_popular" boolean DEFAULT false,
	"seo_title" varchar(255),
	"seo_description" text,
	"seo_keywords" text,
	"status" "product_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug"),
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"company_name" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"product_name" varchar(255),
	"sku" varchar(100),
	"category" varchar(255),
	"quantity" varchar(100),
	"location" varchar(255),
	"message" text,
	"source_page" varchar(255),
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "careers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"title_ar" varchar(255),
	"department" varchar(100),
	"location" varchar(255),
	"job_type" varchar(100),
	"experience_required" varchar(255),
	"description" text,
	"description_ar" text,
	"requirements" text,
	"requirements_ar" text,
	"salary_range" varchar(255),
	"slug" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "careers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"career_id" integer NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"position" varchar(255) NOT NULL,
	"experience" text,
	"cv_url" text,
	"message" text,
	"status" "application_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"title_ar" varchar(255),
	"slug" varchar(255) NOT NULL,
	"featured_image" text,
	"category" varchar(100),
	"author" varchar(255),
	"excerpt" text,
	"excerpt_ar" text,
	"content" text,
	"content_ar" text,
	"seo_title" varchar(255),
	"seo_description" text,
	"focus_keyword" varchar(255),
	"language" "language" DEFAULT 'en',
	"publish_date" timestamp with time zone DEFAULT now(),
	"status" "publish_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"title" varchar(255),
	"title_ar" varchar(255),
	"category" varchar(100),
	"alt_text" varchar(255),
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"title_ar" varchar(255),
	"pdf_file" text NOT NULL,
	"cover_image" text,
	"category" varchar(100),
	"description" text,
	"description_ar" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"designation" varchar(255),
	"department" varchar(100),
	"photo" text,
	"bio" text,
	"bio_ar" text,
	"email" varchar(255),
	"linked_in" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"question_ar" text,
	"answer" text NOT NULL,
	"answer_ar" text,
	"category" varchar(100),
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "industries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"name_ar" varchar(255),
	"icon" varchar(100),
	"description" text,
	"description_ar" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "counters" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(255) NOT NULL,
	"label_ar" varchar(255),
	"value" varchar(100) NOT NULL,
	"icon" varchar(100),
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "home_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text,
	"video" text,
	"title" varchar(255),
	"title_ar" varchar(255),
	"subtitle" text,
	"subtitle_ar" text,
	"cta_text" varchar(100),
	"cta_text_ar" varchar(100),
	"cta_link" text,
	"cta_secondary_text" varchar(100),
	"cta_secondary_text_ar" varchar(100),
	"cta_secondary_link" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "home_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"video" text NOT NULL,
	"title" varchar(255),
	"title_ar" varchar(255),
	"category" varchar(100),
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "popular_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"name_ar" varchar(255),
	"image" text,
	"link" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seo_meta" (
	"id" serial PRIMARY KEY NOT NULL,
	"page" varchar(255) NOT NULL,
	"meta_title" varchar(255),
	"meta_description" text,
	"focus_keyword" varchar(255),
	"slug" varchar(255),
	"image_alt" text,
	"canonical_url" text,
	"og_title" varchar(255),
	"og_image" text,
	"language" "language" DEFAULT 'en',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"language" "language" DEFAULT 'en' NOT NULL,
	"value" text NOT NULL,
	"group" varchar(100) DEFAULT 'general',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_subcategory_id_subcategories_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "public"."subcategories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_career_id_careers_id_fk" FOREIGN KEY ("career_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_active_role_idx" ON "users" ("is_active","role");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "settings_group_key_idx" ON "settings" ("group","key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_slug_idx" ON "categories" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_active_order_idx" ON "categories" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subcategory_slug_idx" ON "subcategories" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subcategory_category_idx" ON "subcategories" ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subcategory_active_cat_order_idx" ON "subcategories" ("is_active","category_id","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_slug_idx" ON "products" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_sku_idx" ON "products" ("sku");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_idx" ON "products" ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_subcategory_idx" ON "products" ("subcategory_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_status_idx" ON "products" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_featured_idx" ON "products" ("is_featured");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_popular_idx" ON "products" ("is_popular");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_status_featured_idx" ON "products" ("status","is_featured");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_status_popular_idx" ON "products" ("status","is_popular");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_status_category_idx" ON "products" ("status","category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_status_created_idx" ON "products" ("status","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lead_email_idx" ON "leads" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lead_status_idx" ON "leads" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lead_created_at_idx" ON "leads" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lead_status_created_idx" ON "leads" ("status","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "career_slug_idx" ON "careers" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "career_active_dept_idx" ON "careers" ("is_active","department");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "career_active_created_idx" ON "careers" ("is_active","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_career_idx" ON "job_applications" ("career_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_email_idx" ON "job_applications" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_status_created_idx" ON "job_applications" ("status","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_slug_idx" ON "blogs" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_status_idx" ON "blogs" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_status_publish_idx" ON "blogs" ("status","publish_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_status_category_idx" ON "blogs" ("status","category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "gallery_category_idx" ON "gallery" ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "gallery_active_order_idx" ON "gallery" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "catalog_category_idx" ON "catalogs" ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "catalog_active_category_idx" ON "catalogs" ("is_active","category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_active_order_idx" ON "team_members" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faq_active_category_idx" ON "faqs" ("is_active","category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faq_active_order_idx" ON "faqs" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "industry_active_order_idx" ON "industries" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "counter_active_order_idx" ON "counters" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "banner_active_order_idx" ON "home_banners" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "video_active_order_idx" ON "home_videos" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "popcat_active_order_idx" ON "popular_categories" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "seo_page_idx" ON "seo_meta" ("page");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "seo_page_lang_unique" ON "seo_meta" ("page","language");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "translation_key_lang_unique" ON "translations" ("key","language");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "translation_group_key_idx" ON "translations" ("group","key");