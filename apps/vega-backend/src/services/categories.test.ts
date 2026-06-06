import { describe, it, expect, vi, beforeEach } from "vitest";

const deleteWhere = vi.fn().mockReturnValue(Promise.resolve());

function countChain(value: number) {
  const whereFn = vi.fn().mockReturnValue(Promise.resolve([{ value }]));
  const fromFn = vi.fn().mockReturnValue({ where: whereFn });
  const selectFn = vi.fn().mockReturnValue({ from: fromFn });
  return { select: selectFn };
}

function createChainMock(result: any) {
  const limitFn = vi.fn().mockReturnValue(Promise.resolve(result));
  const whereFn = vi.fn().mockReturnValue({ limit: limitFn });
  const fromFn = vi.fn().mockReturnValue({ where: whereFn });
  const selectFn = vi.fn().mockReturnValue({ from: fromFn });
  return { select: selectFn };
}

vi.mock("@vega/db", () => {
  const mockDb = {
    select: vi.fn(),
    delete: vi.fn().mockReturnValue({ where: deleteWhere }),
  };
  return {
    db: mockDb,
    categories: { id: "categories.id" },
    subcategories: { categoryId: "subcategories.category_id" },
    products: { categoryId: "products.category_id" },
  };
});

const { removeCategory } = await import("./categories");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("removeCategory", () => {
  it("throws when category does not exist", async () => {
    const { db } = await import("@vega/db");
    const emptyChain = createChainMock([]);
    db.select.mockReturnValueOnce(emptyChain.select());

    await expect(removeCategory(999)).rejects.toThrow("Category not found");
    expect(db.delete).not.toHaveBeenCalled();
  });

  it("deletes category when empty", async () => {
    const { db } = await import("@vega/db");
    const catChain = createChainMock([{ id: 1 }]);
    const subChain = countChain(0);
    const prodChain = countChain(0);
    db.select
      .mockReturnValueOnce(catChain.select())
      .mockReturnValueOnce(subChain.select())
      .mockReturnValueOnce(prodChain.select());

    const result = await removeCategory(1);
    expect(result).toEqual({ success: true });
    expect(db.delete).toHaveBeenCalled();
    expect(deleteWhere).toHaveBeenCalled();
  });

  it("throws when products exist", async () => {
    const { db } = await import("@vega/db");
    const catChain = createChainMock([{ id: 1 }]);
    const subChain = countChain(0);
    const prodChain = countChain(3);
    db.select
      .mockReturnValueOnce(catChain.select())
      .mockReturnValueOnce(subChain.select())
      .mockReturnValueOnce(prodChain.select());

    await expect(removeCategory(1)).rejects.toThrow(
      "Cannot delete category. It has 3 product(s). Please reassign or delete them first."
    );
    expect(db.delete).not.toHaveBeenCalled();
  });

  it("throws when subcategories exist", async () => {
    const { db } = await import("@vega/db");
    const catChain = createChainMock([{ id: 1 }]);
    const subChain = countChain(2);
    const prodChain = countChain(0);
    db.select
      .mockReturnValueOnce(catChain.select())
      .mockReturnValueOnce(subChain.select())
      .mockReturnValueOnce(prodChain.select());

    await expect(removeCategory(1)).rejects.toThrow(
      "Cannot delete category. It has 2 subcategory(s). Please delete them first."
    );
    expect(db.delete).not.toHaveBeenCalled();
  });

  it("throws when both subcategories and products exist", async () => {
    const { db } = await import("@vega/db");
    const catChain = createChainMock([{ id: 1 }]);
    const subChain = countChain(2);
    const prodChain = countChain(5);
    db.select
      .mockReturnValueOnce(catChain.select())
      .mockReturnValueOnce(subChain.select())
      .mockReturnValueOnce(prodChain.select());

    await expect(removeCategory(1)).rejects.toThrow(
      "Cannot delete category. It has 2 subcategory(s) and 5 product(s). Please reassign or delete them first."
    );
    expect(db.delete).not.toHaveBeenCalled();
  });
});
