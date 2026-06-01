import { HeroSlide, PopularRange, IndustryItem } from "./types";

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    title: "Reliable Furniture, Barriers & Camp Supply Solutions Across UAE",
    subtitle: "Supplying durable camp furniture, queue barriers, office furniture, flag poles, and industrial supply products for businesses across the UAE.",
    ctaText: "Request a Quote",
    ctaLink: "/contact-us",
    ctaSecondaryText: "View Products",
    ctaSecondaryLink: "/products",
    image: "/images/hero/slide-1.jpg",
  },
  {
    id: "2",
    title: "Premium Queue Barriers & Crowd Control Solutions",
    subtitle: "From retractable belt barriers to heavy-duty metal barricades — we supply it all for events, airports, and commercial spaces.",
    ctaText: "Explore Barriers",
    ctaLink: "/products/metal-barriers",
    ctaSecondaryText: "View Catalog",
    ctaSecondaryLink: "/catalog",
    image: "/images/hero/slide-2.jpg",
  },
  {
    id: "3",
    title: "Complete Camp Furniture & Labor Accommodation Supplies",
    subtitle: "Bunk beds, mattresses, lockers, dining sets, and more — delivered and installed across the UAE.",
    ctaText: "Browse Camp Furniture",
    ctaLink: "/products/camp-furniture",
    ctaSecondaryText: "Contact Us",
    ctaSecondaryLink: "/contact-us",
    image: "/images/hero/slide-3.jpg",
  },
  {
    id: "4",
    title: "Modern Office Furniture for UAE Businesses",
    subtitle: "Executive desks, ergonomic chairs, meeting tables, and modular workstations for modern offices.",
    ctaText: "View Office Furniture",
    ctaLink: "/products/office-furniture",
    ctaSecondaryText: "Request a Quote",
    ctaSecondaryLink: "/contact-us",
    image: "/images/hero/slide-4.jpg",
  },
];

export const POPULAR_RANGES: PopularRange[] = [
  { id: "bunk-bed", name: "Bunk Beds", slug: "camp-furniture", image: "/images/products/bunk-bed-heavy-duty.jpgs" },
  { id: "mattresses", name: "Mattresses", slug: "camp-furniture", image: "/images/products/foam-mattress-4-inch.jpg" },
  { id: "office-furniture", name: "Office Furniture", slug: "office-furniture", image: "/images/categories/office-furniture.jpg" },
  { id: "plastic-furniture", name: "Plastic Furniture", slug: "plastic-furniture", image: "/images/categories/plastic-furniture.jpg" },
  { id: "hospitality", name: "Hospitality Equipment", slug: "hospitality", image: "/images/categories/hospitality.jpg" },
  { id: "queue-barriers", name: "Queue Barriers", slug: "queue-barriers", image: "/images/categories/queue-barriers.jpg" },
  { id: "flags-poles", name: "Flags & Poles", slug: "flags-poles", image: "/images/categories/flags-poles.jpg" },
  { id: "waste-bins", name: "Waste Bins", slug: "waste-bins", image: "/images/categories/waste-bins.jpg" },
];

export const INDUSTRIES: IndustryItem[] = [
  { name: "Construction & contracting companies", icon: "Building" },
  { name: "Labor camps & worker housing", icon: "Home" },
  { name: "Landscaping companies", icon: "TreePine" },
  { name: "Facilities management companies", icon: "Briefcase" },
  { name: "Real estate developers", icon: "Landmark" },
  { name: "Joineries and steel fabrication", icon: "Hammer" },
  { name: "Manpower supply companies", icon: "Users2" },
  { name: "Waste management companies", icon: "Trash2" },
  { name: "Government entities", icon: "Factory" },
  { name: "Cold storage facilities", icon: "Snowflake" },
];
