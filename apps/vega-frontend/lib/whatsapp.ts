import { generateWhatsAppLink, generateProductEnquiryMessage } from "@vega/utils";
import { Product } from "@/lib/types";

export function getWhatsAppLink(product: Product, locale?: string): string {
  const isAR = locale === "ar";
  const message = isAR && product.nameAr
    ? `مرحباً فيجا، أنا مهتم بهذا المنتج:\n\nاسم المنتج: ${product.nameAr}\nرمز المنتج: ${product.sku}\nالفئة: ${product.categoryAr || product.category}\nالكمية المطلوبة: \nموقع التوصيل: \n\nيرجى مشاركة السعر والتوفر.`
    : generateProductEnquiryMessage({
        name: product.name,
        sku: product.sku,
        category: product.category,
      });
  return generateWhatsAppLink("971567351095", message);
}
