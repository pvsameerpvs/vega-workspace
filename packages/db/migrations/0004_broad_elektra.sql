CREATE TABLE IF NOT EXISTS "category_showcases" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"title" varchar(255),
	"title_ar" varchar(255),
	"description" text,
	"description_ar" text,
	"image1" text,
	"image2" text,
	"image3" text,
	"image4" text,
	"display_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "showcase_active_order_idx" ON "category_showcases" ("is_active","display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "showcase_category_idx" ON "category_showcases" ("category_id");--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "availability_status";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "wholesale_note";