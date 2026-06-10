export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  sku: string;
  category: string;
  categorySlug?: string;
  categoryAr?: string;
  subcategory: string;
  subcategorySlug?: string;
  subcategoryAr?: string;
  description: string;
  shortDescription?: string;
  shortDescriptionAr?: string;
  fullDescription?: string;
  fullDescriptionAr?: string;
  image: string;
  images: string[];
  color: string;
  dimensions: string;
  weight: string;
  design: string;
  material?: string;
  fittingType: string;
  features: string[];
  featuresAr?: string[];
  warranty: string;
  brand?: string;
  country?: string;
  deliveryInfo: string;
  installation: string;
  bulkAvailable: boolean;
  bulkQuantityNote?: string;
  wholesaleDiscountNote?: string;
  price?: number | null;
  showPrice?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
}

export interface Subcategory {
  id: string | number;
  name: string;
  nameAr?: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  image: string;
  banner?: string;
  description?: string;
  descriptionAr?: string;
  subcategories: Subcategory[];
  subcategoriesAr?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  content?: string;
  contentAr?: string;
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
  descriptionAr?: string;
  requirements?: string;
  requirementsAr?: string;
  experience?: string;
  salaryRange?: string;
}

export interface TeamMember {
  name: string;
  nameAr?: string;
  designation: string;
  designationAr?: string;
  department: string;
  photo: string;
  bio: string;
  bioAr?: string;
  email?: string;
  linkedIn?: string;
}

export interface GalleryItem {
  name: string;
  nameAr?: string;
  image: string;
  category?: string;
}

export interface CatalogItem {
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  coverImage?: string;
  pdfFile?: string;
  category?: string;
}

export interface FaqItem {
  q: string;
  qAr?: string;
  a: string;
  aAr?: string;
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
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  ctaText: string;
  ctaTextAr?: string;
  ctaLink: string;
  ctaSecondaryText: string;
  ctaSecondaryTextAr?: string;
  ctaSecondaryLink: string;
  image: string;
}

export interface PopularRange {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  image: string;
}

export interface IndustryItem {
  name: string;
  nameAr?: string;
  icon?: string;
}
