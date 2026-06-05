"use client";

import { useState } from "react";
import { useBlog } from "@/hooks/use-blog";
import { useBlogForm } from "@/hooks/use-blog-form";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { Edit2, Trash2 } from "lucide-react";

export function BlogManager() {
  const { items: blogs, loading, create, update, remove } = useBlog();
  const { toast } = useToast();
  const { form, setForm, update: updateForm, setTitle, reset } = useBlogForm();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const filtered = safeBlogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditBlog(null);
    reset();
    setFormOpen(true);
  };

  const openEdit = (blog: any) => {
    setEditBlog(blog);
    setForm({ ...blog });
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editBlog) {
        await update(editBlog.id, form);
        toast({ title: "Blog post updated", description: `${form.title} has been updated.` });
      } else {
        await create({ ...form, status: "published", publishDate: new Date().toISOString() });
        toast({ title: "Blog post created", description: "New post added successfully." });
      }
      setFormOpen(false);
      setEditBlog(null);
      reset();
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save blog post.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await remove(deleteId);
      toast({ title: "Deleted", description: "Blog post removed." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Blog Manager" subtitle="Create and publish blog posts." actionLabel="Add Post" onAction={openCreate} />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No blog posts found.</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={b.featuredImage}
                alt={b.title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="h-16 w-24 rounded-lg object-cover select-none pointer-events-none"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{b.title}</p>
                <p className="text-xs text-slate-400">{b.category} &middot; {b.author} &middot; {b.publishDate ? new Date(b.publishDate).toLocaleDateString() : "—"}</p>
              </div>
              <StatusBadge status={b.status} />
              <div className="flex gap-2">
                <button onClick={() => openEdit(b)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-vega-blue"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => setDeleteId(b.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormDialog
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditBlog(null); reset(); }}
        title={editBlog ? "Edit Blog Post" : "Add Blog Post"}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      >
        <BlogForm form={form} onChange={updateForm} onTitleChange={setTitle} />
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Blog Post" />
    </div>
  );
}
