"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { useCategoryShowcases } from "@/hooks/use-category-showcases";
import { FormDialog } from "@/components/admin/FormDialog";
import { CategoryShowcaseCard } from "./CategoryShowcaseCard";
import { CategoryShowcaseDialogContent } from "./CategoryShowcaseDialogContent";
import { Plus, LayoutGrid } from "lucide-react";

interface CategoryShowcasesManagerProps {
  categories: any[];
  loading: boolean;
}

const EMPTY_FORM = {
  categoryId: 0,
  title: "",
  titleAr: "",
  description: "",
  descriptionAr: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
};

export function CategoryShowcasesManager({ categories, loading: catsLoading }: CategoryShowcasesManagerProps) {
  const { toast } = useToast();
  const { items, loading, create, update, remove } = useCategoryShowcases();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<any>({ ...EMPTY_FORM });

  const updateForm = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  const openCreate = () => {
    setEditItem(null);
    setForm({ ...EMPTY_FORM });
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setForm({
      categoryId: item.categoryId,
      title: item.title || "",
      titleAr: item.titleAr || "",
      description: item.description || "",
      descriptionAr: item.descriptionAr || "",
      image1: item.image1 || "",
      image2: item.image2 || "",
      image3: item.image3 || "",
      image4: item.image4 || "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.categoryId) return;
    if (editItem) {
      await update(editItem.id, form);
      toast({ title: "Updated", description: "Showcase updated." });
    } else {
      await create({ ...form, displayOrder: items.length, isActive: true });
      toast({ title: "Added", description: "Category showcase created." });
    }
    setDialogOpen(false);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newOrder = [...items];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    Promise.all([
      update(newOrder[index].id, { displayOrder: index }),
      update(newOrder[newIndex].id, { displayOrder: newIndex }),
    ]);
  };

  const isLoading = loading || catsLoading;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-vega-blue" />
            <p className="text-sm font-bold text-slate-900">Category Showcases</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-1 rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark"
          >
            <Plus className="h-3 w-3" />
            Add New
          </button>
        </div>

        <FormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title={editItem ? "Edit Showcase" : "Add Showcase"}
          onSubmit={handleSubmit}
          submitLabel={editItem ? "Update" : "Create"}
        >
          <CategoryShowcaseDialogContent form={form} update={updateForm} categories={categories} />
        </FormDialog>

        {isLoading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 animate-pulse rounded-lg bg-slate-200" />)}</div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white py-12 text-center">
            <p className="text-sm text-slate-400">No category showcases found. Add one to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <CategoryShowcaseCard
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                categories={categories}
                onMove={moveItem}
                onRemove={remove}
                onEdit={openEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
