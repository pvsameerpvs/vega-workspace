import {
  ShieldCheck,
  Layers,
  Wrench,
  Brush,
  LayoutGrid,
  Boxes,
  HardHat,
  Hotel,
  BedDouble,
  Tent,
  GraduationCap,
  Users,
  Building2,
  Package,
  Headset,
  ClipboardCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import type { LandingContent } from "../types";

export const bunkBedsContent: LandingContent = {
  path: "/bunk-beds",
  categoryName: "Camp Furniture",
  hero: {
    eyebrow: "BUNK BED SOLUTIONS",
    title: "Durable Bunk Beds for Commercial & Accommodation Projects",
    subtitle:
      "Reliable bunk bed solutions designed for hostels, worker accommodation, dormitories, camps, institutions and high-occupancy environments.",
    primaryCta: "Request a Bunk Bed Quote",
    secondaryCta: "Explore Bunk Beds",
    imageAlt: "Commercial bunk beds for worker accommodation and hostel projects",
    specLines: ["Heavy duty & standard options", "Multiple configurations", "Bulk supply for projects"],
  },
  quote: {
    eyebrow: "QUICK QUOTE",
    title: "Request a Bunk Bed Quotation",
    subtitle:
      "Tell us your bed type, quantity and delivery location — we'll respond with availability and pricing.",
    note: "We'll get back to you with product availability and quotation details.",
  },
  products: {
    eyebrow: "CAMP FURNITURE RANGE",
    title: "Explore Our Full Camp Furniture Range",
    subtitle:
      "Bunk beds, single beds, mattresses, steel lockers, blankets, pillows, bedsheets, dining furniture and electronic equipment — everything for worker accommodation and camp fit-outs.",
    getQuote: "Get Quote",
    viewDetails: "View Details",
    emptyText: "Camp furniture products are being updated. Please contact us for the current range.",
  },
  benefits: {
    eyebrow: "WHY BUNK BEDS",
    title: "Built for Everyday Commercial Use",
    subtitle:
      "Bunk beds designed around the realities of high-occupancy accommodation — strength, space and serviceability.",
    items: [
      {
        title: "Strong Construction",
        description: "Heavy duty and military-grade options built to handle continuous daily use in camps and hostels.",
        icon: ShieldCheck,
      },
      {
        title: "Space Efficient",
        description: "Stacked sleeping layouts that make the most of floor space in dormitories and staff housing.",
        icon: Layers,
      },
      {
        title: "Practical Design",
        description: "Straightforward designs focused on daily usability, cleaning and service in commercial settings.",
        icon: Wrench,
      },
      {
        title: "Easy Maintenance",
        description: "Simple frames and surfaces that are easy to clean and keep in good condition over time.",
        icon: Brush,
      },
      {
        title: "Multiple Configurations",
        description: "Standard, heavy duty, wooden and triple-level options to suit different accommodation layouts.",
        icon: LayoutGrid,
      },
      {
        title: "Suitable for Bulk Projects",
        description: "Bulk quantities supplied for camps, hostels and accommodation fit-out projects.",
        icon: Boxes,
      },
    ],
  },
  applications: {
    eyebrow: "APPLICATIONS",
    title: "Where Our Bunk Beds Are Used",
    subtitle:
      "Accommodation providers and project teams across the UAE rely on bunk beds for high-occupancy environments.",
    items: [
      { title: "Worker Accommodation", description: "Labour camps and staff housing with heavy duty bunk bed options.", icon: HardHat },
      { title: "Hostels", description: "Practical, space-saving sleeping solutions for hostel operators.", icon: Hotel },
      { title: "Dormitories", description: "Multi-bed rooms outfitted with standard or heavy duty bunks.", icon: BedDouble },
      { title: "Camps", description: "Durable beds for temporary and long-term camp facilities.", icon: Tent },
      { title: "Schools & Institutions", description: "Institutional accommodation, boarding facilities and training centres.", icon: GraduationCap },
      { title: "Staff Housing", description: "Comfortable, compact sleeping arrangements for staff quarters.", icon: Users },
    ],
  },
  whyUs: {
    eyebrow: "WHY CHOOSE US",
    title: "A Commercial Supply Partner for Accommodation Projects",
    subtitle:
      "We work with project teams, facility managers and accommodation providers on bulk and ongoing requirements.",
    items: [
      { title: "Commercial Supply", description: "Focused on business, institutional and project requirements rather than single-piece retail.", icon: Building2 },
      { title: "Bulk Requirements", description: "Project quantities handled with confirmation of availability before quotation.", icon: Package },
      { title: "Product Quality", description: "Ranges include heavy duty and military-grade bunk beds for demanding environments.", icon: CheckCircle2 },
      { title: "Custom Requirements", description: "Bulk and custom orders are accepted — tell us your configuration and quantities.", icon: ClipboardCheck },
      { title: "Professional Support", description: "A responsive team that confirms product availability and options before quoting.", icon: Headset },
      { title: "Fast Quotation Response", description: "Request a quote and receive availability and pricing details promptly.", icon: Truck },
    ],
  },
  trust: {
    eyebrow: "TRUST",
    title: "Reliable Solutions for Commercial Requirements",
    subtitle:
      "Furniture, barriers and camp supplies for businesses across the UAE since 2009.",
    items: [
      { title: "Quality Products", description: "Product ranges selected for commercial and institutional use.", icon: CheckCircle2 },
      { title: "Commercial Supply", description: "Dedicated to business and project requirements.", icon: Building2 },
      { title: "Bulk Orders", description: "Project and large-quantity orders accepted.", icon: Boxes },
      { title: "Responsive Support", description: "Availability confirmed and quotations provided on request.", icon: Headset },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Bunk Bed Questions, Answered",
    items: [
      {
        q: "Do you supply bunk beds in bulk?",
        a: "Yes. Bulk and project-quantity bunk bed enquiries are welcome. Share your quantities and delivery location and we'll confirm availability and quotation details.",
      },
      {
        q: "What types of bunk beds are available?",
        a: "Our range includes standard, heavy duty, high-weight military-grade, wooden hostel bunk beds and triple-level configurations, with dimensions varying by model.",
      },
      {
        q: "Can I request a quotation for a project?",
        a: "Absolutely. Use the quote form on this page with your bed type, quantity and requirements — our team will confirm availability and respond with quotation details.",
      },
      {
        q: "Are bunk beds suitable for worker accommodation?",
        a: "Yes. Heavy duty and high-weight bunk beds are part of our range and are commonly used for worker accommodation and staff housing projects.",
      },
      {
        q: "Can I enquire about custom requirements?",
        a: "Bulk and custom orders are accepted. Describe your configuration and quantity requirements and we'll advise what can be supplied.",
      },
    ],
  },
  finalCta: {
    eyebrow: "GET STARTED",
    title: "Have a Bunk Bed Project Requirement?",
    subtitle:
      "Tell us what you need and our team will help you with product availability, quantities and quotation.",
    primary: "Request a Quote",
    secondary: "Contact Us",
    note: "We'll get back to you with product availability and quotation details.",
  },
  sections: ["quote", "products", "benefits", "businessSolutions", "applications", "whyUs", "trust", "faq", "final"],
};