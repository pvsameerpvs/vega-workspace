export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function generateProductEnquiryMessage(product: {
  name: string;
  sku: string;
  category: string;
}): string {
  return `Hello Vega, I am interested in this product:

Product Name: ${product.name}
SKU: ${product.sku}
Category: ${product.category}
Quantity Required: 
Delivery Location: 

Please share price and availability.`;
}
