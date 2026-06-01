export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  images: string[];
  color: string;
  dimensions: string;
  weight: string;
  design: string;
  fittingType: string;
  features: string[];
  warranty: string;
  deliveryInfo: string;
  installation: string;
  bulkAvailable: boolean;
  wholesaleNote: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "camp-furniture",
    name: "Camp Furniture",
    slug: "camp-furniture",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=camp-furniture",
    subcategories: [
      "Bunk Beds",
      "Single Beds",
      "Mattresses",
      "Blankets",
      "Pillows",
      "Bedsheets",
      "Steel Lockers",
      "Dining Tables",
      "Plastic Chairs",
      "Gas Burners",
    ],
  },
  {
    id: "metal-barriers",
    name: "Metal Barriers",
    slug: "metal-barriers",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=metal-barriers",
    subcategories: [
      "Crowd Control Barriers",
      "VIP Poles",
      "Belts and Ropes",
      "Sign Boards",
      "Information Stands",
    ],
  },
  {
    id: "queue-barriers",
    name: "Queue Barriers",
    slug: "queue-barriers",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=queue-barriers",
    subcategories: [
      "Retractable Queue Barriers",
      "Double Belt Queue Barriers",
      "Belt Cassettes",
      "Custom Logo Belt Barriers",
    ],
  },
  {
    id: "office-furniture",
    name: "Office Furniture",
    slug: "office-furniture",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=office-furniture",
    subcategories: [
      "Office Desks",
      "Office Chairs",
      "File Cabinets",
      "Meeting Tables",
      "Workstations",
    ],
  },
  {
    id: "flags-poles",
    name: "Flags & Flag Poles",
    slug: "flags-poles",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=flags-poles",
    subcategories: ["Flag Poles", "Custom Flags", "VIP Poles"],
  },
  {
    id: "hospitality",
    name: "Hospitality Equipment",
    slug: "hospitality",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=hospitality",
    subcategories: ["Banquet Tables", "Refrigerators", "Window AC", "Smart TV"],
  },
  {
    id: "waste-bins",
    name: "Waste Bins",
    slug: "waste-bins",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=waste-bins",
    subcategories: ["Industrial Bins", "Office Bins", "Outdoor Bins"],
  },
  {
    id: "plastic-furniture",
    name: "Plastic Furniture",
    slug: "plastic-furniture",
    image: "https://placehold.co/400x400/1F3A93/FFD400?text=plastic-furniture",
    subcategories: ["Plastic Chairs", "Plastic Tables", "Storage Units"],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bunk Bed Heavy Duty 36kg",
    slug: "bunk-bed-heavy-duty-36kg",
    sku: "VEGA-CB-001",
    category: "Camp Furniture",
    subcategory: "Bunk Beds",
    description:
      "Heavy-duty steel bunk bed designed for labor camps and worker housing. Reinforced frame with anti-rust powder coating.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=Bunk+Bed",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=Bunk+Bed", "https://placehold.co/600x400/1F3A93/FFD400?text=Bunk+Bed+2"],
    color: "Grey",
    dimensions: "200 x 90 x 180 cm",
    weight: "36 kg",
    design: "Heavy Duty",
    fittingType: "Bolted",
    features: [
      "Anti-rust powder coating",
      "Reinforced steel frame",
      "High weight capacity",
      "Easy assembly",
    ],
    warranty: "1 year structural warranty",
    deliveryInfo: "Delivery available across UAE within 3-5 working days",
    installation: "Installation available at additional cost",
    bulkAvailable: true,
    wholesaleNote: "Special bulk pricing available for 50+ units",
  },
  {
    id: "2",
    name: "Single Bed Standard Frame",
    slug: "single-bed-standard-frame",
    sku: "VEGA-CB-002",
    category: "Camp Furniture",
    subcategory: "Single Beds",
    description:
      "Standard single bed frame suitable for worker accommodation and budget housing projects.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=Single+Bed",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=Single+Bed"],
    color: "White",
    dimensions: "200 x 90 x 40 cm",
    weight: "22 kg",
    design: "Standard",
    fittingType: "Welded",
    features: ["Sturdy steel construction", "Compact design", "Low maintenance"],
    warranty: "1 year",
    deliveryInfo: "3-5 working days",
    installation: "Available",
    bulkAvailable: true,
    wholesaleNote: "Bulk discounts for 100+ units",
  },
  {
    id: "3",
    name: "Foam Mattress 4 Inch",
    slug: "foam-mattress-4-inch",
    sku: "VEGA-CM-001",
    category: "Camp Furniture",
    subcategory: "Mattresses",
    description:
      "High-density foam mattress ideal for camp accommodation. Durable cover with easy cleaning.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=mattress",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=mattress"],
    color: "Blue/White",
    dimensions: "190 x 90 x 10 cm",
    weight: "8 kg",
    design: "Standard Foam",
    fittingType: "N/A",
    features: [
      "High-density foam",
      "Water-resistant cover",
      "Anti-microbial treatment",
    ],
    warranty: "6 months",
    deliveryInfo: "2-4 working days",
    installation: "Not required",
    bulkAvailable: true,
    wholesaleNote: "Volume pricing available",
  },
  {
    id: "4",
    name: "Steel Locker 2 Door",
    slug: "steel-locker-2-door",
    sku: "VEGA-CL-001",
    category: "Camp Furniture",
    subcategory: "Steel Lockers",
    description:
      "Durable steel locker for worker camps and gyms. Lockable doors with ventilation slots.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=locker",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=locker"],
    color: "Grey",
    dimensions: "180 x 40 x 45 cm",
    weight: "18 kg",
    design: "2-Door",
    fittingType: "Freestanding",
    features: [
      "Ventilation slots",
      "Padlock compatible",
      "Anti-rust coating",
    ],
    warranty: "1 year",
    deliveryInfo: "3-5 working days",
    installation: "Available",
    bulkAvailable: true,
    wholesaleNote: "Bulk rates for 50+ units",
  },
  {
    id: "5",
    name: "Retractable Queue Barrier",
    slug: "retractable-queue-barrier",
    sku: "VEGA-QB-001",
    category: "Queue Barriers",
    subcategory: "Retractable Queue Barriers",
    description:
      "Premium retractable queue barrier with 2m belt length. Stainless steel post with weighted base.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=queue-barrier",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=queue-barrier", "https://placehold.co/600x400/1F3A93/FFD400?text=queue-barrier-2"],
    color: "Silver",
    dimensions: "320 x 63 x 910 mm",
    weight: "8 kg",
    design: "Retractable Belt",
    fittingType: "Weighted Base",
    features: [
      "2m retractable belt",
      "Slow-retract mechanism",
      "Weighted base for stability",
      "Scratch-resistant finish",
    ],
    warranty: "1 year",
    deliveryInfo: "2-3 working days across UAE",
    installation: "Not required",
    bulkAvailable: true,
    wholesaleNote: "Corporate pricing for 20+ units",
  },
  {
    id: "6",
    name: "Double Belt Queue Barrier",
    slug: "double-belt-queue-barrier",
    sku: "VEGA-QB-002",
    category: "Queue Barriers",
    subcategory: "Double Belt Queue Barriers",
    description:
      "Double belt queue barrier with dual retractable belts for high-traffic areas.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=double-belt",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=double-belt"],
    color: "Black/Silver",
    dimensions: "320 x 63 x 910 mm",
    weight: "10 kg",
    design: "Double Belt",
    fittingType: "Weighted Base",
    features: [
      "Dual retractable belts",
      "High-traffic design",
      "Premium finish",
    ],
    warranty: "1 year",
    deliveryInfo: "3-5 working days",
    installation: "Not required",
    bulkAvailable: true,
    wholesaleNote: "Volume discounts available",
  },
  {
    id: "7",
    name: "VIP Pole Gold 2m",
    slug: "vip-pole-gold-2m",
    sku: "VEGA-MB-001",
    category: "Metal Barriers",
    subcategory: "VIP Poles",
    description:
      "Premium gold VIP pole with red velvet rope for events, hotels, and red-carpet setups.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=vip-pole",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=vip-pole", "https://placehold.co/600x400/1F3A93/FFD400?text=vip-pole-2"],
    color: "Gold",
    dimensions: "50 x 50 x 2000 mm",
    weight: "12 kg",
    design: "Classic VIP",
    fittingType: "Weighted Round Base",
    features: [
      "Gold plated finish",
      "Red velvet rope included",
      "Weighted base",
      "Premium look",
    ],
    warranty: "1 year",
    deliveryInfo: "2-3 working days",
    installation: "Not required",
    bulkAvailable: true,
    wholesaleNote: "Event package pricing available",
  },
  {
    id: "8",
    name: "Crowd Control Barrier 2.3m",
    slug: "crowd-control-barrier-2-3m",
    sku: "VEGA-MB-002",
    category: "Metal Barriers",
    subcategory: "Crowd Control Barriers",
    description:
      "Heavy-duty galvanized steel crowd control barrier for events, construction, and road works.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=crowd-barrier",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=crowd-barrier"],
    color: "Silver",
    dimensions: "2300 x 1100 x 50 mm",
    weight: "18 kg",
    design: "Interlocking",
    fittingType: "Hook & Eye",
    features: [
      "Galvanized steel",
      "Interlocking design",
      "Weather resistant",
      "Easy transport",
    ],
    warranty: "1 year",
    deliveryInfo: "3-5 working days",
    installation: "Available for large setups",
    bulkAvailable: true,
    wholesaleNote: "Rental and sale options available",
  },
  {
    id: "9",
    name: "Sign Board Stand A3",
    slug: "sign-board-stand-a3",
    sku: "VEGA-MB-003",
    category: "Metal Barriers",
    subcategory: "Sign Boards",
    description:
      "A3 size sign board stand for queue management and information display.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=sign-board",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=sign-board"],
    color: "Silver",
    dimensions: "300 x 450 mm",
    weight: "3 kg",
    design: "Adjustable",
    fittingType: "Clamp Base",
    features: [
      "Adjustable angle",
      "A3 frame size",
      "Easy sign change",
    ],
    warranty: "6 months",
    deliveryInfo: "2-3 working days",
    installation: "Not required",
    bulkAvailable: true,
    wholesaleNote: "Bulk pricing available",
  },
  {
    id: "10",
    name: "Executive Office Desk 1.6m",
    slug: "executive-office-desk-1-6m",
    sku: "VEGA-OF-001",
    category: "Office Furniture",
    subcategory: "Office Desks",
    description:
      "Modern executive office desk with cable management and storage drawers.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=office-desk",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=office-desk"],
    color: "Walnut/White",
    dimensions: "1600 x 800 x 750 mm",
    weight: "45 kg",
    design: "Executive",
    fittingType: "Freestanding",
    features: [
      "Cable management system",
      "Lockable drawers",
      "Scratch-resistant surface",
      "Modern design",
    ],
    warranty: "2 years",
    deliveryInfo: "5-7 working days",
    installation: "Free assembly included",
    bulkAvailable: true,
    wholesaleNote: "Corporate office packages available",
  },
  {
    id: "11",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    sku: "VEGA-OF-002",
    category: "Office Furniture",
    subcategory: "Office Chairs",
    description:
      "Ergonomic office chair with lumbar support, adjustable height, and breathable mesh back.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=office-chair",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=office-chair"],
    color: "Black",
    dimensions: "650 x 650 x 1100 mm",
    weight: "15 kg",
    design: "Ergonomic",
    fittingType: "Swivel Base",
    features: [
      "Lumbar support",
      "Adjustable armrests",
      "Breathable mesh",
      "Tilt lock mechanism",
    ],
    warranty: "2 years",
    deliveryInfo: "3-5 working days",
    installation: "Not required",
    bulkAvailable: true,
    wholesaleNote: "Volume pricing for 10+ units",
  },
  {
    id: "12",
    name: "Flag Pole Gold 6m",
    slug: "flag-pole-gold-6m",
    sku: "VEGA-FP-001",
    category: "Flags & Flag Poles",
    subcategory: "Flag Poles",
    description:
      "Premium 6-meter gold anodized aluminum flag pole with halyard system and weighted base.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=flag-pole",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=flag-pole"],
    color: "Gold",
    dimensions: "6000 x 100 mm",
    weight: "25 kg",
    design: "Telescopic",
    fittingType: "Ground Socket / Weighted Base",
    features: [
      "Anodized aluminum",
      "Halyard system",
      "Weather resistant",
      "Easy flag change",
    ],
    warranty: "2 years",
    deliveryInfo: "5-7 working days",
    installation: "Professional installation available",
    bulkAvailable: true,
    wholesaleNote: "Project pricing available",
  },
  {
    id: "13",
    name: "Gas Burner Single Head",
    slug: "gas-burner-single-head",
    sku: "VEGA-CF-001",
    category: "Camp Furniture",
    subcategory: "Gas Burners",
    description:
      "Commercial single-head gas burner for labor camp kitchens and catering setups.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=gas-burner",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=gas-burner"],
    color: "Stainless Steel",
    dimensions: "400 x 400 x 150 mm",
    weight: "5 kg",
    design: "Commercial",
    fittingType: "Countertop",
    features: [
      "High flame output",
      "Stainless steel body",
      "Safety valve included",
      "Easy cleaning",
    ],
    warranty: "1 year",
    deliveryInfo: "3-5 working days",
    installation: "Available",
    bulkAvailable: true,
    wholesaleNote: "Camp kitchen package deals",
  },
  {
    id: "14",
    name: "Plastic Chair Heavy Duty",
    slug: "plastic-chair-heavy-duty",
    sku: "VEGA-CF-002",
    category: "Camp Furniture",
    subcategory: "Plastic Chairs",
    description:
      "Heavy-duty plastic chair for outdoor and indoor use. UV-resistant and stackable.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=plastic-chair",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=plastic-chair"],
    color: "White/Blue",
    dimensions: "450 x 450 x 850 mm",
    weight: "3.5 kg",
    design: "Stackable",
    fittingType: "Freestanding",
    features: [
      "UV resistant",
      "Stackable design",
      "Easy to clean",
      "High weight capacity",
    ],
    warranty: "1 year",
    deliveryInfo: "2-4 working days",
    installation: "Not required",
    bulkAvailable: true,
    wholesaleNote: "Bulk pricing for 100+ units",
  },
  {
    id: "15",
    name: "Dining Table 6-Seater",
    slug: "dining-table-6-seater",
    sku: "VEGA-CF-003",
    category: "Camp Furniture",
    subcategory: "Dining Tables",
    description:
      "6-seater dining table for labor camps and canteens. Steel frame with laminated top.",
    image: "https://placehold.co/600x400/1F3A93/FFD400?text=dining-table",
    images: ["https://placehold.co/600x400/1F3A93/FFD400?text=dining-table"],
    color: "Grey/White",
    dimensions: "1800 x 800 x 750 mm",
    weight: "28 kg",
    design: "6-Seater",
    fittingType: "Freestanding",
    features: [
      "Laminated top",
      "Steel frame",
      "Easy assembly",
      "Stain resistant",
    ],
    warranty: "1 year",
    deliveryInfo: "3-5 working days",
    installation: "Available",
    bulkAvailable: true,
    wholesaleNote: "Camp furniture packages",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase() ||
      p.slug.includes(category.toLowerCase())
  );
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.subcategory.toLowerCase().replace(/\s+/g, "-") ===
      subcategory.toLowerCase()
  );
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}

export const HERO_SLIDES = [
  {
    id: "1",
    title: "Reliable Furniture, Barriers & Camp Supply Solutions Across UAE",
    subtitle:
      "Supplying durable camp furniture, queue barriers, office furniture, flag poles, and industrial supply products for businesses across the UAE.",
    ctaText: "Request a Quote",
    ctaLink: "/contact-us",
    ctaSecondaryText: "View Products",
    ctaSecondaryLink: "/products",
    image: "https://placehold.co/1600x800/1F3A93/FFD400?text=hero-1",
  },
  {
    id: "2",
    title: "Premium Queue Barriers & Crowd Control Solutions",
    subtitle:
      "From retractable belt barriers to heavy-duty metal barricades — we supply it all for events, airports, and commercial spaces.",
    ctaText: "Explore Barriers",
    ctaLink: "/products/metal-barriers",
    ctaSecondaryText: "View Catalog",
    ctaSecondaryLink: "/catalog",
    image: "https://placehold.co/1600x800/1F3A93/FFD400?text=hero-2",
  },
  {
    id: "3",
    title: "Complete Camp Furniture & Labor Accommodation Supplies",
    subtitle:
      "Bunk beds, mattresses, lockers, dining sets, and more — delivered and installed across the UAE.",
    ctaText: "Browse Camp Furniture",
    ctaLink: "/products/camp-furniture",
    ctaSecondaryText: "Contact Us",
    ctaSecondaryLink: "/contact-us",
    image: "https://placehold.co/1600x800/1F3A93/FFD400?text=hero-3",
  },
];

export const STATS = [
  { value: 10000, suffix: "+", label: "sq ft warehouse facility", icon: "warehouse" },
  { value: 300, suffix: "+", label: "products in stock", icon: "box" },
  { value: 1500, suffix: "+", label: "satisfied customers", icon: "users" },
  { value: 15, suffix: "+", label: "years of experience", icon: "award" },
  { value: 15, suffix: "+", label: "industries served", icon: "building" },
  { value: 0, suffix: "", label: "Dedicated customer support", icon: "headset" },
];

export const INDUSTRIES = [
  "Construction & contracting companies",
  "Labor camps & worker housing",
  "Landscaping companies",
  "Facilities management companies",
  "Real estate developers",
  "Joineries and steel fabrication companies",
  "Manpower supply companies",
  "Waste management companies",
  "Government entities",
  "Cold storage facilities",
];

export const FAQS = [
  {
    q: "Do you deliver to Dubai?",
    a: "Yes, delivery is available as per location.",
  },
  {
    q: "Do you deliver across UAE apart from Dubai?",
    a: "Yes, delivery is applicable as per location.",
  },
  {
    q: "Do you install the supplied furniture?",
    a: "Yes, installation cost will be confirmed to the customer.",
  },
  {
    q: "Do you provide data sheets for all supplied products?",
    a: "Yes, verified data sheets can be provided before transaction.",
  },
  {
    q: "Do you exchange or return products?",
    a: "Returned goods will be handled as per company policy.",
  },
  {
    q: "What if I receive damaged goods?",
    a: "Damaged goods can be reported for replacement or support.",
  },
  {
    q: "Do you provide warranty?",
    a: "Warranty availability should be checked before purchase.",
  },
  {
    q: "Do you provide metal barriers on sale and rental basis?",
    a: "Yes, available until the end of the rental period.",
  },
  {
    q: "Do you deliver across UAE?",
    a: "Yes, Vega can deliver and install metal barriers across UAE.",
  },
  {
    q: "What is the lead time if I place an order today?",
    a: "Lead time depends on stock, order quantity, and working days.",
  },
  {
    q: "What are the payment methods?",
    a: "Cheque and payment link.",
  },
];

export const VIDEO_CATEGORIES = [
  { title: "Camp Furniture", video: "/videos/camp-furniture", thumbnail: "https://placehold.co/800x450/1F3A93/FFD400?text=camp-furniture" },
  { title: "Queue Barriers", video: "/videos/queue-barriers", thumbnail: "https://placehold.co/800x450/1F3A93/FFD400?text=queue-barriers" },
  { title: "Flag Poles", video: "/videos/flag-poles", thumbnail: "https://placehold.co/800x450/1F3A93/FFD400?text=flag-poles" },
  { title: "Office Furniture", video: "/videos/office-furniture", thumbnail: "https://placehold.co/800x450/1F3A93/FFD400?text=office-furniture" },
  { title: "Metal Barriers", video: "/videos/metal-barriers", thumbnail: "https://placehold.co/800x450/1F3A93/FFD400?text=metal-barriers" },
  { title: "Hospitality Equipment", video: "/videos/hospitality", thumbnail: "https://placehold.co/800x450/1F3A93/FFD400?text=hospitality" },
];

export const GOOGLE_REVIEWS = [
  {
    name: "Ahmed Al-Rashid",
    rating: 5,
    text: "Vega supplied 200 bunk beds for our labor camp. Quality was excellent and delivery was on time. Highly recommended.",
  },
  {
    name: "Sara Khan",
    rating: 5,
    text: "Professional team and great product range. We ordered queue barriers for our retail stores and they look premium.",
  },
  {
    name: "Mohammed Faizal",
    rating: 4,
    text: "Good service and competitive pricing. The office furniture package was exactly what we needed for our new branch.",
  },
  {
    name: "John Mathews",
    rating: 5,
    text: "We've been working with Vega for 3 years. Their camp supplies are durable and the bulk pricing is very fair.",
  },
];
