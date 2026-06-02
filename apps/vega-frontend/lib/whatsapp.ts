interface Product {
  name: string;
  sku: string;
  category: string;
}

function generateWhatsAppEnquiryMessage(product: Product): string {
  const text = `Hello Vega, I am interested in this product:

Product Name: ${product.name}
SKU: ${product.sku}
Category: ${product.category}
Quantity Required:
Delivery Location:

Please share price and availability.`;

  return encodeURIComponent(text);
}

export function getWhatsAppLink(product: Product): string {
  const message = generateWhatsAppEnquiryMessage(product);
  return `https://wa.me/971567351095?text=${message}`;
}
