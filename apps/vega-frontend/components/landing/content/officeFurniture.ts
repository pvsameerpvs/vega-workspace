import {
  Armchair,
  Monitor,
  Armchair as Chair,
  Building2,
  Presentation,
  LayoutGrid,
  ShieldCheck,
  Boxes,
  Headset,
  Package,
  ClipboardCheck,
  Truck,
  CheckCircle2,
  Table2,
  Warehouse,
  Banknote,
} from "lucide-react";
import type { LandingContent } from "../types";

export const officeFurnitureContent: LandingContent = {
  path: "/office-furniture",
  categoryName: "Office Furniture",
  hero: {
    eyebrow: "OFFICE FURNITURE",
    title: "Professional Office Furniture for Modern Workspaces",
    subtitle:
      "Create practical, comfortable and professional work environments with office furniture solutions for businesses, offices and commercial projects.",
    primaryCta: "Request Office Furniture Quote",
    secondaryCta: "Explore Furniture",
    imageAlt: "Professional office chairs, desks and workstations for commercial workspaces",
    specLines: ["Chairs, desks & workstations", "Commercial supply", "Project requirements"],
  },
  quote: {
    eyebrow: "QUICK QUOTE",
    title: "Request an Office Furniture Quotation",
    subtitle:
      "Tell us the furniture you need and quantities — we'll confirm availability and quotation details.",
    note: "We'll get back to you with product availability and quotation details.",
  },
  products: {
    eyebrow: "FURNITURE RANGE",
    title: "Office Furniture Products",
    subtitle:
      "Chairs, desks, workstations, meeting tables and storage — selected for professional commercial workspaces.",
    getQuote: "Get Quote",
    viewDetails: "View Details",
    emptyText: "Office furniture products are being updated. Please contact us for the current range.",
  },
  categories: {
    eyebrow: "CATEGORIES",
    title: "Furniture for Every Part of the Office",
    subtitle:
      "Browse by the type of furniture you need for your workspace fit-out.",
    items: [
      { title: "Office Chairs", description: "Executive, ergonomic, visitor and meeting chairs.", icon: Armchair },
      { title: "Desks & Tables", description: "Office tables, L-shape desks and workstations.", icon: Table2 },
      { title: "Meeting & Round Tables", description: "Meeting tables, round tables and coffee tables.", icon: Presentation },
      { title: "Cabinets & Storage", description: "Glass door and steel filing cabinets.", icon: Warehouse },
    ],
  },
  benefits: {
    eyebrow: "WHY OFFICE FURNITURE",
    title: "Furniture That Works as Hard as Your Team",
    subtitle:
      "Practical, professional furniture built for daily commercial use.",
    items: [
      { title: "Professional Design", description: "Clean, corporate styling that presents well in any office.", icon: Chair },
      { title: "Practical Workspace Solutions", description: "Chairs, desks and workstations matched to how teams actually work.", icon: Monitor },
      { title: "Durable Materials", description: "Furniture selected for continuous daily use in commercial settings.", icon: ShieldCheck },
      { title: "Flexible Options", description: "Executive, ergonomic, visitor and meeting options across the range.", icon: LayoutGrid },
      { title: "Commercial Supply", description: "Quantities supplied for offices, facilities and fit-out projects.", icon: Building2 },
      { title: "Project Support", description: "Availability confirmed and quotations provided for complete requirements.", icon: ClipboardCheck },
    ],
  },
  inspiration: {
    eyebrow: "WORKSPACE INSPIRATION",
    title: "An Office That Feels Professional",
    subtitle:
      "The right furniture shapes how a workspace feels and functions. From executive chairs to meeting tables, our range supports a complete professional environment.",
    image: "",
    imageAlt: "Professional office furniture arrangement",
    text: "Plan your complete workspace — desks, chairs, meeting tables and storage — and we'll confirm availability and quotation details for the full requirement.",
  },
  whyUs: {
    eyebrow: "WHY CHOOSE US",
    title: "A Commercial Furniture Supply Partner",
    subtitle:
      "We supply office furniture to businesses and fit-out projects across the UAE.",
    items: [
      { title: "Commercial Supply", description: "Focused on supplying businesses and commercial projects.", icon: Building2 },
      { title: "Bulk Pricing", description: "Quantities for complete offices confirmed before quotation.", icon: Banknote },
      { title: "Product Quality", description: "Furniture selected for durability in daily commercial use.", icon: CheckCircle2 },
      { title: "Custom Requirements", description: "Bulk and custom orders accepted — share your fit-out needs.", icon: ClipboardCheck },
      { title: "Professional Support", description: "Availability and options confirmed before quoting.", icon: Headset },
      { title: "Fast Quotation Response", description: "Prompt responses to furniture pricing enquiries.", icon: Truck },
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
    title: "Office Furniture Questions, Answered",
    items: [
      {
        q: "Do you supply office furniture for complete projects?",
        a: "Yes. We supply office furniture for complete workspace requirements — chairs, desks, workstations, meeting tables and storage.",
      },
      {
        q: "Can I request bulk pricing?",
        a: "Yes. Share your furniture list and quantities and we'll confirm availability and bulk quotation details.",
      },
      {
        q: "What office furniture products are available?",
        a: "Our range includes office chairs, executive and visitor chairs, office tables, L-shape desks, workstations, meeting tables, round tables and cabinets.",
      },
      {
        q: "Can I request a quotation?",
        a: "Yes. Use the quote form on this page with the furniture and quantities you need, and we'll respond with availability and pricing.",
      },
      {
        q: "Do you provide commercial furniture solutions?",
        a: "Yes. We supply furniture for offices, businesses and commercial fit-out projects across the UAE.",
      },
    ],
  },
  finalCta: {
    eyebrow: "GET STARTED",
    title: "Have an Office Furniture Requirement?",
    subtitle:
      "Tell us what you need and our team will help you with product availability, quantities and quotation.",
    primary: "Request a Quote",
    secondary: "Contact Us",
    note: "We'll get back to you with product availability and quotation details.",
  },
  sections: ["quote", "categories", "products", "benefits", "businessSolutions", "inspiration", "whyUs", "trust", "faq", "final"],
};