import {
  ShieldCheck,
  LayoutGrid,
  MoveHorizontal,
  Sparkles,
  RefreshCw,
  Building2,
  Plane,
  Landmark,
  Store,
  HeartPulse,
  Hotel,
  PartyPopper,
  ConciergeBell,
  Users,
  Package,
  Headset,
  Truck,
  CheckCircle2,
  ClipboardCheck,
  Boxes,
  Rows3,
  Settings2,
  FileText,
} from "lucide-react";
import type { LandingContent } from "../types";

export const queueBarriersContent: LandingContent = {
  path: "/queue-barriers",
  categoryName: "Queue Barriers",
  hero: {
    eyebrow: "QUEUE BARRIERS",
    title: "Professional Queue Barrier Systems for Organized Customer Flow",
    subtitle:
      "Create clear, organized and professional customer queues with practical queue barrier solutions for commercial and public environments.",
    primaryCta: "Request a Queue Barrier Quote",
    secondaryCta: "View Queue Barriers",
    imageAlt: "Queue stanchions and belts for organized customer flow",
    specLines: ["Stanchions, belts & ropes", "Multiple colour options", "Bulk supply available"],
  },
  quote: {
    eyebrow: "QUICK QUOTE",
    title: "Request a Queue Barrier Quotation",
    subtitle:
      "Tell us your queue setup, quantity and colour preferences — we'll confirm availability and pricing.",
    note: "We'll get back to you with product availability and quotation details.",
  },
  products: {
    eyebrow: "QUEUE RANGE",
    title: "Queue Barrier Solutions",
    subtitle:
      "Stanchions, belt cassettes, velvet ropes and VIP poles — everything needed for professional queue management.",
    getQuote: "Get Quote",
    viewDetails: "View Details",
    emptyText: "Queue barrier products are being updated. Please contact us for the current range.",
  },
  applications: {
    eyebrow: "APPLICATIONS",
    title: "Perfect for Organized Customer Flow",
    subtitle:
      "Queue barriers create order in high-traffic environments where people need clear direction.",
    items: [
      { title: "Airports", description: "Passenger lanes and waiting areas kept organised and clear.", icon: Plane },
      { title: "Banks", description: "Customer queues managed professionally at counters and ATMs.", icon: Landmark },
      { title: "Retail Stores", description: "Checkout lines and promotion areas guided with belts and stanchions.", icon: Store },
      { title: "Hospitals", description: "Orderly queuing at reception, pharmacy and service counters.", icon: HeartPulse },
      { title: "Hotels", description: "Guest flow managed at front desks and event registration.", icon: Hotel },
      { title: "Events", description: "Registration, entry and information queues kept organised.", icon: PartyPopper },
      { title: "Government Facilities", description: "Service counters and public areas with clear queue guidance.", icon: Building2 },
      { title: "Reception Areas", description: "Professional first impressions with tidy visitor flow.", icon: ConciergeBell },
    ],
  },
  benefits: {
    eyebrow: "WHY QUEUE BARRIERS",
    title: "Queues That Work for You",
    subtitle:
      "The right queue system keeps customer flow organised, professional and under control.",
    items: [
      { title: "Better Queue Organization", description: "Clear lanes and defined waiting areas reduce confusion and crowding.", icon: Rows3 },
      { title: "Professional Appearance", description: "Clean, uniform stanchions and belts present a polished environment.", icon: Sparkles },
      { title: "Easy Positioning", description: "Lightweight, portable units that can be rearranged quickly.", icon: MoveHorizontal },
      { title: "Durable Construction", description: "Metal stanchions built for daily use in high-traffic locations.", icon: ShieldCheck },
      { title: "Flexible Layout", description: "Configurations adapt as customer flow and space needs change.", icon: LayoutGrid },
      { title: "High-Traffic Areas", description: "Suitable for environments where queues form continuously.", icon: Users },
    ],
  },
  steps: {
    eyebrow: "HOW IT WORKS",
    title: "From Enquiry to Quotation in Three Steps",
    subtitle:
      "Getting your queue barrier requirement quoted is straightforward.",
    items: [
      { title: "Choose Your Barrier", description: "Select stanchions, belts, ropes or a complete queue setup from our range.", icon: Settings2 },
      { title: "Tell Us Your Requirement", description: "Share quantities, colours and layout details through the quote form.", icon: FileText },
      { title: "Receive Your Quote", description: "We confirm availability and respond with your quotation details.", icon: CheckCircle2 },
    ],
  },
  whyUs: {
    eyebrow: "WHY CHOOSE US",
    title: "A Supply Partner for Queue Management",
    subtitle:
      "We supply queue barrier products to businesses and facilities across the UAE.",
    items: [
      { title: "Commercial Supply", description: "Focused on supplying businesses, facilities and venues.", icon: Building2 },
      { title: "Bulk Orders", description: "Quantities for full queue systems confirmed before quotation.", icon: Package },
      { title: "Product Quality", description: "Durable stanchions and professional finish options.", icon: CheckCircle2 },
      { title: "Custom Requirements", description: "Bulk and custom orders accepted — share your setup needs.", icon: ClipboardCheck },
      { title: "Professional Support", description: "Availability and options confirmed before any quotation.", icon: Headset },
      { title: "Fast Quotation Response", description: "Prompt responses to queue barrier pricing enquiries.", icon: Truck },
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
    title: "Queue Barrier Questions, Answered",
    items: [
      {
        q: "Where are queue barriers commonly used?",
        a: "Queue barriers are commonly used in banks, airports, retail stores, hospitals, hotels, event venues, government facilities and reception areas.",
      },
      {
        q: "Can I order queue barriers in bulk?",
        a: "Yes. Bulk quantities for full queue systems are welcome. Provide your setup details and we'll confirm availability and quotation.",
      },
      {
        q: "How do I request a quotation?",
        a: "Use the quote form on this page with the stanchion, belt or rope type and quantity you need. Our team will respond with availability and pricing.",
      },
      {
        q: "Can queue barriers be used for events?",
        a: "Yes. Stanchions, belts and ropes are widely used to manage queues and registration lines at events and functions.",
      },
      {
        q: "What information should I provide for a quotation?",
        a: "The barrier type (stanchion, belt, rope), quantity, colour preferences and delivery location help us provide an accurate quotation.",
      },
    ],
  },
  finalCta: {
    eyebrow: "GET STARTED",
    title: "Have a Queue Management Requirement?",
    subtitle:
      "Tell us what you need and our team will help you with product availability, quantities and quotation.",
    primary: "Request a Quote",
    secondary: "Contact Us",
    note: "We'll get back to you with product availability and quotation details.",
  },
  sections: ["quote", "products", "applications", "benefits", "businessSolutions", "steps", "whyUs", "trust", "faq", "final"],
};