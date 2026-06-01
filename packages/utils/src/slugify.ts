export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function generateSlug(name: string, id?: number): string {
  const baseSlug = slugify(name);
  return id ? `${baseSlug}-${id}` : `${baseSlug}-${Date.now()}`;
}
