"use client";
import { Switch } from "@/components/ui/switch";
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
          <Switch
            aria-label="Published"
            checked={published}
            disabled={disabled}
            onCheckedChange={(checked) =>
              onChange({
                published: checked,
                featured: checked ? featured : false,
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
          <Switch
            aria-label="Featured on landing"
            checked={featured}
            disabled={!published || disabled}
            onCheckedChange={(checked) =>
              onChange({ published, featured: checked })
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
