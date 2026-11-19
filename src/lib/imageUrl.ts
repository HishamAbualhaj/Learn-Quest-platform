import API_BASE_URL from "@/config/config";

/** Uploaded filenames use the API; remote and public images keep their own URL. */
export function imageUrl(
  value: string | null | undefined,
  fallback = "/person.png",
): string {
  const source = value?.trim();
  if (!source) return fallback;
  if (/^https?:\/\//i.test(source)) return source;
  if (/^[a-z][a-z\d+.-]*:/i.test(source) || source.startsWith("//"))
    return fallback;
  if (source.startsWith("/uploads/")) return `${API_BASE_URL}${source}`;
  if (source.startsWith("/")) return source;
  return `${API_BASE_URL}/uploads/${source.replace(/^uploads\//, "")}`;
}
