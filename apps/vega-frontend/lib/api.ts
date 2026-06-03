const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function fetcher<T>(path: string, options?: RequestInit & { next?: any }): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
      next: { revalidate: 60, ...(options?.next || {}) },
    });
    if (!res.ok) {
      console.error(`[API Error] ${res.status} ${path}`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (e) {
    console.error(`[API Error] ${path}`, e);
    return null;
  }
}

async function fetcherList<T>(path: string, options?: RequestInit): Promise<T[]> {
  const res = await fetcher<{ data: T[] } | T[]>(path, options);
  if (Array.isArray(res)) return res;
  if (res && typeof res === "object" && "data" in res && Array.isArray(res.data)) return res.data;
  return [];
}

export async function getProducts() {
  return fetcherList<any>("/products");
}

export async function getProduct(slug: string) {
  return fetcher<any>(`/products/${slug}`);
}

export async function getCategories() {
  return fetcherList<any>("/categories");
}

export async function getBanners() {
  const data = await fetcher<any>("/settings");
  return data?.banners || [];
}

export async function getCounters() {
  const data = await fetcher<any>("/settings");
  return data?.stats || [];
}

export async function getFaqs() {
  return fetcherList<any>("/faqs");
}

export async function getBlogPosts() {
  return fetcherList<any>("/blog");
}

export async function getGallery() {
  return fetcherList<any>("/gallery");
}

export async function getCareers() {
  return fetcherList<any>("/careers/jobs");
}

export async function getTeam() {
  return fetcherList<any>("/team");
}

export async function getCatalogs() {
  return fetcherList<any>("/catalogs");
}

export async function getSpotlightItems() {
  return fetcherList<any>("/homepage/spotlight", { next: { revalidate: 0 } });
}

export async function submitLead(data: any) {
  return fetcher<any>("/leads", { method: "POST", body: JSON.stringify(data) });
}

export async function getSubcategories(categoryId: number) {
  return fetcherList<any>(`/categories/${categoryId}/subcategories`);
}

// Mappers
export function mapProductToFrontend(p: any) {
  if (!p) return null;
  return {
    id: String(p.id),
    name: p.name || "",
    slug: p.slug || "",
    sku: p.sku || "",
    categoryId: p.categoryId || null,
    category: p.categoryName || p.category || "",
    subcategory: p.subcategoryName || p.subcategory || "",
    description: p.shortDescription || p.fullDescription || p.description || "",
    image: p.mainImage || p.image || "",
    images: Array.isArray(p.gallery) ? p.gallery : p.images || [],
    color: p.color || "",
    dimensions: p.dimensions || "",
    weight: p.weight || "",
    design: p.design || "",
    material: p.material || "",
    fittingType: p.fittingType || "",
    features: Array.isArray(p.features) ? p.features : (p.features ? p.features.split(",").map((s: string) => s.trim()).filter(Boolean) : []),
    featuresAr: p.featuresAr || "",
    warranty: p.warranty || "",
    brand: p.brand || "",
    country: p.country || "",
    deliveryInfo: p.deliveryInfo || (p.deliveryAvailable ? "Delivery available" : "") || "",
    installation: p.installation || (p.installationAvailable ? "Installation available" : "") || "",
    bulkAvailable: !!p.bulkAvailable || !!p.bulkQuantityNote,
    bulkQuantityNote: p.bulkQuantityNote || "",
    wholesaleNote: p.wholesaleNote || "",
    wholesaleDiscountNote: p.wholesaleDiscountNote || "",
    price: p.price || null,
    showPrice: !!p.showPrice,
    isFeatured: !!p.isFeatured,
    isPopular: !!p.isPopular,
  };
}

export function mapCategoryToFrontend(c: any) {
  if (!c) return null;
  return {
    id: String(c.id || c.slug),
    name: c.name || "",
    slug: c.slug || "",
    image: c.image || c.banner || "",
    subcategories: Array.isArray(c.subcategories) ? c.subcategories.map((s: any) => s.name || s) : [],
  };
}

export function mapBlogToFrontend(b: any) {
  if (!b) return null;
  return {
    slug: b.slug || String(b.id),
    title: b.title || "",
    excerpt: b.excerpt || b.description || "",
    content: b.content || "",
    featuredImage: b.featuredImage || b.image || "",
    date: b.publishDate ? new Date(b.publishDate).toLocaleDateString() : b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "",
    author: b.author || "Vega Team",
    category: b.category || "",
  };
}

export function mapGalleryToFrontend(g: any) {
  if (!g) return null;
  return {
    name: g.title || g.name || "",
    image: g.image || g.url || "",
    category: g.category || "",
  };
}

export function mapCareerToFrontend(c: any) {
  if (!c) return null;
  return {
    slug: c.slug || String(c.id),
    title: c.title || "",
    titleAr: c.titleAr || "",
    department: c.department || "",
    location: c.location || "",
    type: c.jobType || c.type || "",
    description: c.description || "",
    requirements: c.requirements || "",
    experience: c.experienceRequired || c.experience || "",
    salaryRange: c.salaryRange || "",
  };
}

export function mapTeamToFrontend(t: any) {
  if (!t) return null;
  return {
    name: t.name || "",
    designation: t.designation || t.role || "",
    department: t.department || "",
    photo: t.photo || t.image || "",
    bio: t.bio || t.description || "",
    email: t.email || "",
    linkedIn: t.linkedIn || "",
  };
}

export function mapFaqToFrontend(f: any) {
  if (!f) return null;
  return {
    q: f.question || f.q || "",
    a: f.answer || f.a || "",
    category: f.category || "",
  };
}

export function mapCatalogToFrontend(c: any) {
  if (!c) return null;
  return {
    name: c.title || c.name || "",
    description: c.description || "",
    coverImage: c.coverImage || c.image || "",
    pdfFile: c.pdfFile || c.pdf || "",
    category: c.category || "",
  };
}
