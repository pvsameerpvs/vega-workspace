export const MOCK_SETTINGS = [
  { id: 1, key: "company_name", value: "Vega UAE", group: "general", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 2, key: "company_phone", value: "+971 56 735 1095", group: "general", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 3, key: "company_email", value: "Sales@thevegauae.com", group: "general", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 4, key: "company_address", value: "Dubai, UAE", group: "general", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 5, key: "warehouse_address", value: "Sharjah, UAE", group: "general", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 6, key: "whatsapp_number", value: "+971 56 735 1095", group: "general", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 7, key: "min_order_dubai", value: "3000", group: "delivery", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 8, key: "min_order_other_emirates", value: "7000", group: "delivery", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 9, key: "default_currency", value: "AED", group: "general", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 10, key: "facebook_url", value: "https://facebook.com/thevegauae", group: "social", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 11, key: "instagram_url", value: "https://instagram.com/thevegauae", group: "social", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 12, key: "linkedin_url", value: "https://linkedin.com/company/thevegauae", group: "social", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
];

export const MOCK_SEO = [
  { id: 1, page: "home", metaTitle: "Vega UAE | Camp Furniture, Barriers & Office Supplies", metaDescription: "Leading B2B supplier of camp furniture, queue barriers, metal barriers, office furniture, and industrial supplies across UAE.", focusKeyword: "Vega UAE", slug: "", imageAlt: "Vega UAE Hero Image", canonicalUrl: "https://thevegauae.com", ogTitle: "Vega UAE | Camp Furniture, Barriers & Office Supplies", ogImage: "/images/og/vega-uae.jpg", language: "en" as const, createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 2, page: "products", metaTitle: "Products | Vega UAE", metaDescription: "Browse our full range of camp furniture, barriers, office furniture, and more.", focusKeyword: "Vega products", slug: "products", imageAlt: "Vega Products", canonicalUrl: "https://thevegauae.com/products", ogTitle: "Products | Vega UAE", ogImage: "/images/og/products.jpg", language: "en" as const, createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 3, page: "about", metaTitle: "About Us | Vega UAE", metaDescription: "Learn about Vega, a trusted supplier of camp furniture, barriers, and industrial supplies across the UAE.", focusKeyword: "Vega about", slug: "about-us", imageAlt: "About Vega UAE", canonicalUrl: "https://thevegauae.com/about-us", ogTitle: "About Us | Vega UAE", ogImage: "/images/og/about.jpg", language: "en" as const, createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 4, page: "contact", metaTitle: "Contact Us | Vega UAE", metaDescription: "Get in touch with Vega for enquiries, quotes, and orders.", focusKeyword: "Vega contact", slug: "contact-us", imageAlt: "Contact Vega", canonicalUrl: "https://thevegauae.com/contact-us", ogTitle: "Contact Us | Vega UAE", ogImage: "/images/og/contact.jpg", language: "en" as const, createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 5, page: "blog", metaTitle: "Blog | Vega UAE", metaDescription: "Latest articles, industry insights, and product updates from Vega.", focusKeyword: "Vega blog", slug: "blog", imageAlt: "Vega Blog", canonicalUrl: "https://thevegauae.com/blog", ogTitle: "Blog | Vega UAE", ogImage: "/images/og/blog.jpg", language: "en" as const, createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
];

export const MOCK_TRANSLATIONS = [
  { id: 1, key: "nav_products", language: "en" as const, value: "Products", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 2, key: "nav_products", language: "ar" as const, value: "المنتجات", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 3, key: "nav_about", language: "en" as const, value: "About Us", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 4, key: "nav_about", language: "ar" as const, value: "من نحن", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 5, key: "nav_contact", language: "en" as const, value: "Contact Us", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 6, key: "nav_contact", language: "ar" as const, value: "اتصل بنا", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 7, key: "nav_blog", language: "en" as const, value: "Blog", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 8, key: "nav_blog", language: "ar" as const, value: "المدونة", group: "nav", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 9, key: "cta_request_quote", language: "en" as const, value: "Request a Quote", group: "cta", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 10, key: "cta_request_quote", language: "ar" as const, value: "اطلب عرض سعر", group: "cta", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 11, key: "cta_enquire_whatsapp", language: "en" as const, value: "Enquire on WhatsApp", group: "cta", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
  { id: 12, key: "cta_enquire_whatsapp", language: "ar" as const, value: "استفسار على واتساب", group: "cta", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-06-01") },
];
