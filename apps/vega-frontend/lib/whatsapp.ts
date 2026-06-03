import { generateWhatsAppLink, generateProductEnquiryMessage } from "@vega/utils";

interface Product {
  name: string;
  sku: string;
  category: string;
}

export function getWhatsAppLink(product: Product): string {
  const message = generateProductEnquiryMessage(product);
  return generateWhatsAppLink("971567351095", message);
}
