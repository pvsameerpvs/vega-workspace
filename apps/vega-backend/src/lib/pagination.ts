import { Request } from "express";

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  category?: string;
}

export function getPaginationParams(req: Request): PaginationParams {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
  const search = (req.query.search as string) || undefined;
  const sortBy = (req.query.sortBy as string) || "createdAt";
  const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc";
  const status = (req.query.status as string) || undefined;
  const category = (req.query.category as string) || undefined;

  return { page, limit, search, sortBy, sortOrder, status, category };
}

export function paginateResponse<T>(items: T[], page: number, limit: number) {
  const total = items.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = items.slice(start, end);
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export function filterBySearch<T extends Record<string, any>>(items: T[], search: string, fields: string[]) {
  const lower = search.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const val = item[field];
      return val !== undefined && val !== null && String(val).toLowerCase().includes(lower);
    })
  );
}

export function filterByStatus<T extends Record<string, any>>(items: T[], status: string, field = "status") {
  return items.filter((item) => item[field] === status);
}

export function filterByCategory<T extends Record<string, any>>(items: T[], category: string, field = "category") {
  return items.filter((item) => item[field] === category);
}
