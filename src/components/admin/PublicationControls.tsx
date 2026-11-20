"use client";
import type { Publication } from "@/types";
export default function PublicationControls({
  value,
  onChange,
  disabled = false,
}: {
  value: Publication;
  onChange: (value: { published: boolean; featured: boolean }) => void;
  disabled?: boolean;
}) {
  const published = Boolean(value.published),
    featured = Boolean(value.featured);
  return (
    <fieldset
      disabled={disabled}
      className="rounded-md border border-input bg-lightLayout/40 p-5 dark:bg-dark/30"
    >
      <legend className="px-2 text-sm font-semibold">Visibility</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-5 shrink-0 rounded-md accent-action"
            checked={published}
            onChange={(e) =>
              onChange({
                published: e.target.checked,
                featured: e.target.checked ? featured : false,
              })
            }
          />
          <span>
            <span className="block text-sm font-semibold">Published</span>
            <span className="mt-1 block text-sm leading-6 text-muted-foreground">
              Visible on the platform. Unpublished items stay in drafts.
            </span>
          </span>
        </label>
        <label
          className={`flex items-start gap-3 ${published ? "cursor-pointer" : "opacity-60"}`}
        >
          <input
            type="checkbox"
            className="mt-1 size-5 shrink-0 rounded-md accent-action"
            checked={featured}
            disabled={!published}
            onChange={(e) =>
              onChange({ published, featured: e.target.checked })
            }
          />
          <span>
            <span className="block text-sm font-semibold">
              Featured on landing
            </span>
            <span className="mt-1 block text-sm leading-6 text-muted-foreground">
              Publish first, then select this item for the homepage.
            </span>
          </span>
        </label>
      </div>
    </fieldset>
  );
}
