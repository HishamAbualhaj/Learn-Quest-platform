export function publicationFlags(
  data,
  defaults = { published: false, featured: false },
) {
  const parse = (value, fallback) => {
    if (value === undefined) return fallback;
    if ([true, 1].includes(value)) return true;
    if ([false, 0].includes(value)) return false;
    throw new Error("Publication flags must be booleans.");
  };
  const published = parse(data.published, defaults.published),
    featured = parse(data.featured, defaults.featured);
  if (featured && !published)
    throw new Error("Publish this item before featuring it.");
  return { published, featured };
}
