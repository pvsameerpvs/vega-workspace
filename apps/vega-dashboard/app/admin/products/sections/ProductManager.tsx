"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/use-products";
import { useToast } from "@vega/ui";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { DeleteDialog } from "@/components/admin/DeleteDialog";

export function ProductManager() {
  const { products, loading, create, update, remove } = useProducts();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  // Load categories for display
  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q)
    );
  });

  const handleSave = async (data: any) => {
    if (editProduct) {
      await update(editProduct.id, data);
      toast({ title: "Product updated", description: `${data.name} has been updated.` });
    } else {
      await create(data);
      toast({ title: "Product created", description: `${data.name} has been added.` });
    }
    setEditProduct(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await remove(deleteId);
      toast({ title: "Product deleted", description: "The product has been removed." });
      setDeleteId(null);
    }
  };

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

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, SKU, or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
        />
      </div>

      <ProductTable
        products={filtered}
        loading={loading}
        categories={categories}
        onEdit={(p) => {
          setEditProduct(p);
          setFormOpen(true);
        }}
        onDelete={(id) => setDeleteId(id)}
      />

      <ProductForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditProduct(null);
        }}
        onSubmit={handleSave}
        product={editProduct}
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
