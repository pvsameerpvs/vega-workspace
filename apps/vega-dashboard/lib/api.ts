const API_BASE = (() => {
  if (typeof window === 'undefined') {
    if (process.env.API_URL_INTERNAL) return process.env.API_URL_INTERNAL;
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    return "http://localhost:4000/api";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
})();

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleUnauthorized(status: number) {
  if (typeof window !== "undefined" && status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
}

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const isFormData = options?.body instanceof FormData;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
      headers: isFormData
        ? { ...getAuthHeaders() }
        : { "Content-Type": "application/json", ...getAuthHeaders(), ...((options?.headers as Record<string,string>) || {}) },
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `Request failed with status ${res.status}` }));
      handleUnauthorized(res.status);
      throw new Error(err.error || `Request failed: ${res.status}`);
    }
    return res.json() as Promise<T>;
  } catch (e: any) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') throw new Error('Request timed out. Please check your connection and try again.');
    throw e;
  }
}

export const api = {
  // Auth
  login: (data: { email: string; password: string }) => fetcher<{ token: string; refreshToken: string; user: any }>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  logout: () => fetcher<any>("/auth/logout", { method: "POST" }),
  me: () => fetcher<any>("/auth/me"),

  // Products
  getProducts: () => fetcher<any[]>("/products?limit=1000"),
  getProductsPaginated: (page: number, limit: number, search?: string, category?: number, subcategory?: number) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    if (category) params.set("category", String(category));
    if (subcategory) params.set("subcategory", String(subcategory));
    return fetcher<{ data: any[]; meta: { total: number; totalPages: number; page: number; limit: number } }>(`/products?${params}`);
  },
  getProduct: (slug: string) => fetcher<any>(`/products/${slug}`),
  createProduct: (data: any) => fetcher<any>("/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id: number, data: any) => fetcher<any>(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id: number) => fetcher<any>(`/products/${id}`, { method: "DELETE" }),

  // Categories
  getCategories: () =>
    fetcher<any>("/categories").then((res) => (Array.isArray(res) ? res : res?.data ?? [])),
  createCategory: (data: any) => fetcher<any>("/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id: number, data: any) => fetcher<any>(`/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (id: number) => fetcher<any>(`/categories/${id}`, { method: "DELETE" }),
  getSubcategories: (id: number) => fetcher<any[]>(`/categories/${id}/subcategories`),
  createSubcategory: (categoryId: number, data: any) => fetcher<any>(`/categories/${categoryId}/subcategories`, { method: "POST", body: JSON.stringify(data) }),
  updateSubcategory: (id: number, data: any) => fetcher<any>(`/categories/subcategories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSubcategory: (id: number) => fetcher<any>(`/categories/subcategories/${id}`, { method: "DELETE" }),

  // Leads
  getLeads: () => fetcher<any[]>("/leads"),
  createLead: (data: any) => fetcher<any>("/leads", { method: "POST", body: JSON.stringify(data) }),
  updateLead: (id: number, data: any) => fetcher<any>(`/leads/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  updateLeadStatus: (id: number, status: string) => fetcher<any>(`/leads/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  deleteLead: (id: number) => fetcher<any>(`/leads/${id}`, { method: "DELETE" }),

  // Blog
  getBlogs: () => fetcher<any[]>("/blog"),
  getBlog: (slug: string) => fetcher<any>(`/blog/${slug}`),
  createBlog: (data: any) => fetcher<any>("/blog", { method: "POST", body: JSON.stringify(data) }),
  updateBlog: (id: number, data: any) => fetcher<any>(`/blog/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlog: (id: number) => fetcher<any>(`/blog/${id}`, { method: "DELETE" }),

  // Gallery
  getGallery: () => fetcher<any[]>("/gallery"),
  createGallery: (data: any) => fetcher<any>("/gallery", { method: "POST", body: JSON.stringify(data) }),
  updateGallery: (id: number, data: any) => fetcher<any>(`/gallery/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteGallery: (id: number) => fetcher<any>(`/gallery/${id}`, { method: "DELETE" }),

  // Catalogs
  getCatalogs: () => fetcher<any[]>("/catalogs"),
  getCatalog: (id: number) => fetcher<any>(`/catalogs/${id}`),
  createCatalog: (data: any) => fetcher<any>("/catalogs", { method: "POST", body: JSON.stringify(data) }),
  updateCatalog: (id: number, data: any) => fetcher<any>(`/catalogs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCatalog: (id: number) => fetcher<any>(`/catalogs/${id}`, { method: "DELETE" }),
  getCatalogCategories: (catalogId: number) => fetcher<any[]>(`/catalogs/${catalogId}/categories`),
  linkCategoryToCatalog: (catalogId: number, categoryId: number) => fetcher<any>(`/catalogs/${catalogId}/categories`, { method: "POST", body: JSON.stringify({ categoryId }) }),
  unlinkCategoryFromCatalog: (catalogId: number, categoryId: number) => fetcher<any>(`/catalogs/${catalogId}/categories/${categoryId}`, { method: "DELETE" }),

  // Team
  getTeam: () => fetcher<any[]>("/team"),
  createTeam: (data: any) => fetcher<any>("/team", { method: "POST", body: JSON.stringify(data) }),
  updateTeam: (id: number, data: any) => fetcher<any>(`/team/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTeam: (id: number) => fetcher<any>(`/team/${id}`, { method: "DELETE" }),

  // FAQs
  getFaqs: () => fetcher<any[]>("/faqs"),
  createFaq: (data: any) => fetcher<any>("/faqs", { method: "POST", body: JSON.stringify(data) }),
  updateFaq: (id: number, data: any) => fetcher<any>(`/faqs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteFaq: (id: number) => fetcher<any>(`/faqs/${id}`, { method: "DELETE" }),

  // Careers
  getCareers: () => fetcher<any[]>("/careers/jobs"),
  createCareer: (data: any) => fetcher<any>("/careers/jobs", { method: "POST", body: JSON.stringify(data) }),
  updateCareer: (id: number, data: any) => fetcher<any>(`/careers/jobs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCareer: (id: number) => fetcher<any>(`/careers/jobs/${id}`, { method: "DELETE" }),
  getApplications: () => fetcher<any[]>("/careers/applications"),
  updateApplicationStatus: (id: number, status: string) => fetcher<any>(`/careers/applications/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  deleteApplication: (id: number) => fetcher<any>(`/careers/applications/${id}`, { method: "DELETE" }),

  // Settings
  getSettings: () => fetcher<any>("/settings"),
  updateSetting: (key: string, value: string) => fetcher<any>(`/settings/${key}`, { method: "PUT", body: JSON.stringify({ value }) }),
  getHomepageConfig: () => fetcher<any>("/settings/homepage-config"),
  updateHomepageConfig: (data: any) => fetcher<any>("/settings/homepage-config", { method: "PUT", body: JSON.stringify(data) }),
  createBanner: (data: any) => fetcher<any>("/settings/banner", { method: "POST", body: JSON.stringify(data) }),
  updateBanner: (id: number, data: any) => fetcher<any>(`/settings/banner/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBanner: (id: number) => fetcher<any>(`/settings/banner/${id}`, { method: "DELETE" }),
  updateCounter: (id: number, data: any) => fetcher<any>(`/settings/counter/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  updateSeo: (id: number, data: any) => fetcher<any>(`/settings/seo/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  // Homepage
  getHomepageVideos: () => fetcher<any[]>("/homepage/videos"),
  createHomepageVideo: (data: any) => fetcher<any>("/homepage/videos", { method: "POST", body: JSON.stringify(data) }),
  updateHomepageVideo: (id: number, data: any) => fetcher<any>(`/homepage/videos/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteHomepageVideo: (id: number) => fetcher<any>(`/homepage/videos/${id}`, { method: "DELETE" }),
  getPopularCategories: () => fetcher<any[]>("/homepage/popular-categories"),
  createPopularCategory: (data: any) => fetcher<any>("/homepage/popular-categories", { method: "POST", body: JSON.stringify(data) }),
  updatePopularCategory: (id: number, data: any) => fetcher<any>(`/homepage/popular-categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePopularCategory: (id: number) => fetcher<any>(`/homepage/popular-categories/${id}`, { method: "DELETE" }),
  getIndustries: () => fetcher<any[]>("/homepage/industries"),
  createIndustry: (data: any) => fetcher<any>("/homepage/industries", { method: "POST", body: JSON.stringify(data) }),
  updateIndustry: (id: number, data: any) => fetcher<any>(`/homepage/industries/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteIndustry: (id: number) => fetcher<any>(`/homepage/industries/${id}`, { method: "DELETE" }),

  // Spotlight
  getSpotlightItems: () => fetcher<any[]>("/homepage/spotlight"),
  createSpotlightItem: (data: any) => fetcher<any>("/homepage/spotlight", { method: "POST", body: JSON.stringify(data) }),
  updateSpotlightItem: (id: number, data: any) => fetcher<any>(`/homepage/spotlight/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSpotlightItem: (id: number) => fetcher<any>(`/homepage/spotlight/${id}`, { method: "DELETE" }),

  // Category Showcases
  getCategoryShowcases: () => fetcher<any[]>("/homepage/category-showcases"),
  createCategoryShowcase: (data: any) => fetcher<any>("/homepage/category-showcases", { method: "POST", body: JSON.stringify(data) }),
  updateCategoryShowcase: (id: number, data: any) => fetcher<any>(`/homepage/category-showcases/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategoryShowcase: (id: number) => fetcher<any>(`/homepage/category-showcases/${id}`, { method: "DELETE" }),

  // Upload
  getPresignedUrl: (fileName: string, folder = "uploads") =>
    fetcher<{ uploadUrl: string; publicUrl: string; key: string }>("/upload/presigned", { method: "POST", body: JSON.stringify({ fileName, folder }) }),
  uploadFile: (file: File, folder = "uploads") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    return fetcher<{ publicUrl: string; key: string }>("/upload/file", { method: "POST", body: formData });
  },
};
