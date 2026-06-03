CREATE TABLE IF NOT EXISTS "spotlight_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"title_ar" varchar(255),
	"subtitle" varchar(255),
	"subtitle_ar" varchar(255),
	"image" text,
	"link" text,
	"link_type" varchar(20) DEFAULT 'category',
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spotlight_active_order_idx" ON "spotlight_items" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spotlight_link_type_idx" ON "spotlight_items" ("link_type","is_active");