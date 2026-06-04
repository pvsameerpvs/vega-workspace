export function cleanBody(body: any): any {
  if (!body || typeof body !== "object") return body;
  const { id, createdAt, updatedAt, ...rest } = body;
  return rest;
}
