"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import type { Publication } from "@/types";
export default function ContentVisibility({
  kind,
  id,
  value,
}: {
  kind: string;
  id: string | number;
  value: Publication;
}) {
  const cache = useQueryClient();
  const published = Boolean(value.published),
    featured = Boolean(value.featured);
  const save = useMutation({
    mutationFn: async (flags: { published: boolean; featured: boolean }) => {
      const res = await useFetch(
        `${API_BASE_URL}/setContentVisibility`,
        { kind, id, ...flags },
        "POST",
      );
      if (!res.status) throw new Error(String(res.msg));
    },
    onSuccess: () => cache.invalidateQueries({ queryKey: ["admin"] }),
  });
  return (
    <div className="min-w-48">
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-3 text-sm">
          <Switch
            aria-label="Published"
            checked={published}
            disabled={save.isPending}
            onCheckedChange={(checked) =>
              save.mutate({
                published: checked,
                featured: checked ? featured : false,
              })
            }
          />
          <span>{published ? "Published" : "Draft"}</span>
        </label>
        <label className="flex items-center gap-3 text-sm">
          <Switch
            aria-label="Featured on landing"
            checked={featured}
            disabled={!published || save.isPending}
            onCheckedChange={(checked) =>
              save.mutate({ published, featured: checked })
            }
          />
          <span>Featured</span>
        </label>
      </div>
      {save.error && (
        <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">
          {save.error.message}
        </p>
      )}
    </div>
  );
}
