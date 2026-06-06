import { db, categories, subcategories, products } from "@vega/db";
import { eq, count } from "drizzle-orm";

export async function removeCategory(id: number) {
  const [cat] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  if (!cat) {
    throw new Error("Category not found");
  }

  const [subCount] = await db
    .select({ value: count() })
    .from(subcategories)
    .where(eq(subcategories.categoryId, id));

  const [productCount] = await db
    .select({ value: count() })
    .from(products)
    .where(eq(products.categoryId, id));

  const subs = subCount?.value ?? 0;
  const prods = productCount?.value ?? 0;

  if (prods > 0 && subs > 0) {
    throw new Error(
      `Cannot delete category. It has ${subs} subcategory(s) and ${prods} product(s). Please reassign or delete them first.`
    );
  }

  if (prods > 0) {
    throw new Error(
      `Cannot delete category. It has ${prods} product(s). Please reassign or delete them first.`
    );
  }

  if (subs > 0) {
    throw new Error(
      `Cannot delete category. It has ${subs} subcategory(s). Please delete them first.`
    );
  }

  await db.delete(categories).where(eq(categories.id, id));
  return { success: true };
}
