"use client";

import { useState, useEffect, useCallback } from "react";
import { usePaginatedProducts } from "@/hooks/use-paginated-products";
import { useToast } from "@vega/ui";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { DeleteDialog } from "@/components/admin/DeleteDialog";

export function ProductManager() {
  const {
    items: products, loading, page, total, totalPages,
    categoryId, subcategoryId,
    setPage, setSearch, setCategoryId, setSubcategoryId, refresh,
  } = usePaginatedProducts(20);
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (categoryId) {
      api.getSubcategories(categoryId).then(setSubcategories).catch(() => setSubcategories([]));
    } else {
      setSubcategories([]);
    }
  }, [categoryId]);

  const handleSave = useCallback(async (data: any) => {
    if (!data.name?.trim()) {
      toast({ title: "Validation Error", description: "Product name is required.", variant: "destructive" });
      return;
    }
    if (!data.sku?.trim()) {
      toast({ title: "Validation Error", description: "Product SKU is required.", variant: "destructive" });
      return;
    }
    if (!data.categoryId) {
      toast({ title: "Validation Error", description: "Please select a parent category.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      if (editProduct) {
        await api.updateProduct(editProduct.id, data);
        toast({ title: "Product updated", description: `${data.name} has been updated.` });
      } else {
        await api.createProduct(data);
        toast({ title: "Product created", description: `${data.name} has been added.` });
      }
      setEditProduct(null);
      setFormOpen(false);
      refresh();
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save product.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }, [editProduct, toast, refresh]);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await api.deleteProduct(deleteId);
      toast({ title: "Product deleted", description: "The product has been removed." });
      setDeleteId(null);
      refresh();
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  }, [deleteId, toast, refresh]);

  return (
    <div className="p-8">
      <PageHeader
        title="Product Manager"
        subtitle="Manage all products. First create categories, then assign products under them."
        actionLabel="Add Product"
        onAction={() => {
          setEditProduct(null);
          setFormOpen(true);
        }}
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by name, SKU, or slug..."
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value); setSearch(e.target.value); }}
          className="w-full max-w-xs rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
        />
        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={subcategoryId ?? ""}
          onChange={(e) => setSubcategoryId(e.target.value ? Number(e.target.value) : null)}
          disabled={!categoryId}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-vega-blue focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">All Subcategories</option>
          {subcategories.map((s: any) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        categories={categories}
        onEdit={(p) => {
          setEditProduct(p);
          setFormOpen(true);
        }}
        onDelete={(id) => setDeleteId(id)}
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
      />

      <ProductForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditProduct(null);
        }}
        onSubmit={handleSave}
        product={editProduct}
        loading={isSubmitting}
      />

      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}