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

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  featuredImage?: string;
  date: string;
  author?: string;
  category?: string;
}

export interface Career {
  slug: string;
  title: string;
  titleAr?: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  experience?: string;
  salaryRange?: string;
}

export interface TeamMember {
  name: string;
  designation: string;
  department: string;
  photo: string;
  bio: string;
  email?: string;
  linkedIn?: string;
}

export interface GalleryItem {
  name: string;
  image: string;
  category?: string;
}

export interface CatalogItem {
  name: string;
  description: string;
  coverImage?: string;
  pdfFile?: string;
  category?: string;
}

export interface FaqItem {
  q: string;
  a: string;
  category?: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  text: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  image: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: string;
}

export interface PopularRange {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IndustryItem {
  name: string;
  icon?: string;
}
