CREATE TABLE IF NOT EXISTS "catalog_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"catalog_id" integer NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalog_categories" ADD CONSTRAINT "catalog_categories_catalog_id_catalogs_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalog_categories" ADD CONSTRAINT "catalog_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "catalog_category_unique_idx" ON "catalog_categories" ("catalog_id","category_id");