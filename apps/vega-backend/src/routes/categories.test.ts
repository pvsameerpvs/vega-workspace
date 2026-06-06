import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import { removeCategory } from "../services/categories";

vi.mock("@vega/db", () => ({
  db: {},
  categories: {},
  subcategories: {},
  products: {},
}));

vi.mock("@vega/utils", () => ({
  slugify: vi.fn((s: string) => s.toLowerCase().replace(/\s+/g, "-")),
}));

vi.mock("../middleware/auth", () => ({
  authenticate: vi.fn((req: any, res: any, next: any) => next()),
}));

vi.mock("../services/categories", () => ({
  removeCategory: vi.fn(),
}));

const { default: router } = await import("../routes/categories");

function mockReq(params: any = {}): Partial<Request> {
  return { params };
}

function mockRes(): Partial<Response> & { statusCode: number; jsonBody: any } {
  const res: any = {
    statusCode: 200,
    jsonBody: null,
  };
  res.status = vi.fn((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json = vi.fn((body: any) => {
    res.jsonBody = body;
    return res;
  });
  return res;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("DELETE /categories/:id", () => {
  it("returns 400 when category has dependencies", async () => {
    const mockedRemove = vi.mocked(removeCategory);
    mockedRemove.mockRejectedValue(
      new Error("Cannot delete category. It has 3 product(s). Please reassign or delete them first.")
    );

    const req = mockReq({ id: "1" }) as Request;
    const res = mockRes() as Response;

    const handler = router.stack.find((layer: any) => layer.route?.path === "/:id" && layer.route.methods.delete)?.route.stack[1].handle;
    await handler(req, res, vi.fn());

    expect(res.statusCode).toBe(400);
    expect((res as any).jsonBody).toEqual({
      error: "Cannot delete category. It has 3 product(s). Please reassign or delete them first.",
    });
  });

  it("returns 500 on unexpected errors", async () => {
    const mockedRemove = vi.mocked(removeCategory);
    mockedRemove.mockRejectedValue(new Error("Database connection lost"));

    const req = mockReq({ id: "1" }) as Request;
    const res = mockRes() as Response;

    const handler = router.stack.find((layer: any) => layer.route?.path === "/:id" && layer.route.methods.delete)?.route.stack[1].handle;
    await handler(req, res, vi.fn());

    expect(res.statusCode).toBe(500);
    expect((res as any).jsonBody).toEqual({
      error: "Database connection lost",
    });
  });

  it("returns 200 on successful deletion", async () => {
    const mockedRemove = vi.mocked(removeCategory);
    mockedRemove.mockResolvedValue({ success: true });

    const req = mockReq({ id: "1" }) as Request;
    const res = mockRes() as Response;

    const handler = router.stack.find((layer: any) => layer.route?.path === "/:id" && layer.route.methods.delete)?.route.stack[1].handle;
    await handler(req, res, vi.fn());

    expect(res.statusCode).toBe(200);
    expect((res as any).jsonBody).toEqual({ success: true });
  });
});
