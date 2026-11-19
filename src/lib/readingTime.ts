export function readingTimeMinutes(content?: string) {
  const text = (content ?? "")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .trim();
  return Math.max(1, Math.ceil((text ? text.split(/\s+/).length : 0) / 200));
}
