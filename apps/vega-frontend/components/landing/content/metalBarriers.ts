import {
  ShieldCheck,
  ArrowLeftRight,
  LayoutGrid,
  Sparkles,
  RefreshCw,
  Building2,
  PartyPopper,
  HardHat,
  Landmark,
  Warehouse,
  Users,
  DoorOpen,
  Package,
  Headset,
  Truck,
  CheckCircle2,
  ClipboardCheck,
  Boxes,
} from "lucide-react";
import type { LandingContent } from "../types";

export const metalBarriersContent: LandingContent = {
  path: "/metal-barriers",
  categoryName: "Metal Barriers",
  hero: {
    eyebrow: "METAL BARRIERS",
    title: "Strong Metal Barriers for Safety, Control & Crowd Management",
    subtitle:
      "Professional metal barrier solutions for events, commercial spaces, construction areas, public facilities and controlled-access environments.",
    primaryCta: "Request a Quote",
    secondaryCta: "View Barrier Options",
    imageAlt: "Heavy duty metal barriers for events and crowd management",
    specLines: ["Multiple sizes available", "Bulk supply for events", "Commercial projects"],
  },
  quote: {
    eyebrow: "QUICK QUOTE",
    title: "Request a Metal Barrier Quotation",
    subtitle:
      "Tell us the barrier size, quantity and where you need them — we'll confirm availability and pricing.",
    note: "We'll get back to you with product availability and quotation details.",
  },
  products: {
    eyebrow: "BARRIER RANGE",
    title: "Metal Barrier Solutions",
    subtitle:
      "Durable steel barriers for crowd control, site safety and access management — available in multiple lengths and heights.",
    getQuote: "Get Quote",
    viewDetails: "View Details",
    emptyText: "Metal barrier products are being updated. Please contact us for the current range.",
  },
  applications: {
    eyebrow: "APPLICATIONS",
    title: "Designed for Multiple Environments",
    subtitle:
      "Metal barriers are used wherever crowd movement needs to be guided, controlled or restricted.",
    items: [
      { title: "Events", description: "Queue control and crowd separation at events, functions and public gatherings.", icon: PartyPopper },
      { title: "Construction Sites", description: "Perimeter control and access management around active work areas.", icon: HardHat },
      { title: "Public Areas", description: "Guiding foot traffic in public spaces, walkways and open areas.", icon: Landmark },
      { title: "Commercial Facilities", description: "Access control and safety barriers for commercial and industrial premises.", icon: Warehouse },
      { title: "Crowd Management", description: "Segmentation and flow control for large gatherings and venues.", icon: Users },
      { title: "Temporary Access Control", description: "Quickly deployed barriers for temporary closures and restricted zones.", icon: DoorOpen },
    ],
  },
  benefits: {
    eyebrow: "WHY METAL BARRIERS",
    title: "Built to Perform, Built to Last",
    subtitle:
      "Practical barrier solutions that handle real-world conditions at events and commercial sites.",
    items: [
      { title: "Durable Construction", description: "Steel barriers designed for repeated use in demanding environments.", icon: ShieldCheck },
      { title: "Easy Deployment", description: "Simple to position, move and reconfigure as requirements change.", icon: ArrowLeftRight },
      { title: "Practical Design", description: "Straightforward designs that are easy to store and handle.", icon: LayoutGrid },
      { title: "Professional Appearance", description: "Clean, uniform barriers that present well at events and facilities.", icon: Sparkles },
      { title: "Reusable", description: "Long service life — barriers are used, stored and redeployed across events.", icon: RefreshCw },
      { title: "Commercial Applications", description: "Suitable for projects, venues and facilities with ongoing needs.", icon: Building2 },
    ],
  },
  useCases: {
    eyebrow: "IN THE FIELD",
    title: "Barriers in Real Environments",
    subtitle:
      "From event venues to construction perimeters, metal barriers keep movement organised and areas secure.",
    items: [
      { title: "Event Crowd Control", description: "Forming lanes and keeping crowds organised at ticketed events and functions." },
      { title: "Site Safety & Access", description: "Controlling entry and protecting people around construction and work zones." },
      { title: "Public & Commercial Areas", description: "Guiding foot traffic and managing queues in public and commercial settings." },
    ],
  },
  whyUs: {
    eyebrow: "WHY CHOOSE US",
    title: "A Supply Partner for Barrier Requirements",
    subtitle:
      "We supply barrier products to event companies, facilities and project teams across the UAE.",
    items: [
      { title: "Commercial Supply", description: "Focused on supplying businesses, venues and project teams.", icon: Building2 },
      { title: "Bulk Orders", description: "Barrier quantities for events and sites confirmed before quotation.", icon: Package },
      { title: "Product Quality", description: "Durable steel barrier options for demanding applications.", icon: CheckCircle2 },
      { title: "Custom Requirements", description: "Bulk and custom orders accepted — share your size and quantity needs.", icon: ClipboardCheck },
      { title: "Professional Support", description: "Availability and options confirmed before any quotation is issued.", icon: Headset },
      { title: "Fast Quotation Response", description: "Prompt responses to pricing and availability enquiries.", icon: Truck },
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
    title: "Metal Barrier Questions, Answered",
    items: [
      {
        q: "Where can metal barriers be used?",
        a: "Metal barriers are commonly used at events, construction sites, public areas and commercial facilities for crowd control and access management.",
      },
      {
        q: "Are metal barriers suitable for events?",
        a: "Yes. Steel barriers are a practical choice for guiding queues and managing crowds at events and public gatherings.",
      },
      {
        q: "Can I order barriers in bulk?",
        a: "Yes. Bulk barrier orders for events, venues and projects are welcome. Provide quantities and we'll confirm availability and pricing.",
      },
      {
        q: "How can I request pricing?",
        a: "Use the quote form on this page with the barrier size and quantity you need. Our team will respond with availability and quotation details.",
      },
      {
        q: "Do you supply commercial projects?",
        a: "Yes. We supply barrier requirements for commercial facilities, event companies and project teams across the UAE.",
      },
    ],
  },
  finalCta: {
    eyebrow: "GET STARTED",
    title: "Have a Barrier Requirement?",
    subtitle:
      "Tell us what you need and our team will help you with product availability, quantities and quotation.",
    primary: "Request a Quote",
    secondary: "Contact Us",
    note: "We'll get back to you with product availability and quotation details.",
  },
  sections: ["quote", "products", "applications", "benefits", "useCases", "whyUs", "trust", "faq", "final"],
};