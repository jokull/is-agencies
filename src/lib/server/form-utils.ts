/**
 * Type-safe form data utilities
 */

export function getFormString(data: FormData, key: string): string | null {
  const value = data.get(key);
  if (typeof value === "string") {
    return value;
  }
  return null;
}

export function getFormStringArray(data: FormData, key: string): string[] {
  const values = data.getAll(key);
  return values.filter((v): v is string => typeof v === "string");
}

export function getFormFile(data: FormData, key: string): File | null {
  const value = data.get(key);
  if (value instanceof File) {
    return value;
  }
  return null;
}
