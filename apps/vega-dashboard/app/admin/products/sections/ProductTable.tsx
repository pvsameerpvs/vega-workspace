import { Badge } from "@vega/ui";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Edit2, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: any[];
  loading: boolean;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
  categories?: any[];
}

export function ProductTable({ products, loading, onEdit, onDelete, categories = [] }: ProductTableProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  const getCategoryName = (catId: number | string) => categoryMap[catId]?.name || catId || "—";
  const getSubcategoryName = (subId: number | string, catId: number | string) => {
    const cat = categoryMap[catId];
    if (!cat) return subId || "—";
    const sub = cat.subcategories?.find((s: any) => s.id === subId);
    return sub?.name || subId || "—";
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-200" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
        <p className="text-sm text-slate-400">No products found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Image</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">SKU</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Category</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Price</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Badges</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-slate-50 transition-colors hover:bg-slate-50/50">
              <td className="px-4 py-3">
                <img
                  src={p.mainImage || p.image || ""}
                  alt={p.name}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-10 w-10 rounded-lg object-cover select-none pointer-events-none"
                  style={{ WebkitUserDrag: "none" } as any}
                />
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{p.name}</p>
                <p className="text-xs text-slate-400">{p.slug}</p>
              </td>
              <td className="px-4 py-3 text-slate-600">{p.sku}</td>
              <td className="px-4 py-3">
                <p className="text-slate-900">{getCategoryName(p.categoryId)}</p>
                {p.subcategoryId && <p className="text-xs text-slate-400">Sub: {getSubcategoryName(p.subcategoryId, p.categoryId)}</p>}
              </td>
              <td className="px-4 py-3">
                {p.price && p.showPrice ? (
                  <span className="font-semibold text-vega-blue">AED {p.price.toLocaleString()}</span>
                ) : p.price ? (
                  <span className="text-slate-400">AED {p.price.toLocaleString()} <span className="text-xs">(hidden)</span></span>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
              <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  {p.isFeatured && <Badge variant="vega">Featured</Badge>}
                  {p.isPopular && <Badge variant="outline">Popular</Badge>}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-vega-blue"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
