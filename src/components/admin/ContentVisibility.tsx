"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          disabled={save.isPending}
          aria-pressed={published}
          onClick={() =>
            save.mutate({
              published: !published,
              featured: !published ? featured : false,
            })
          }
        >
          {published ? "Published" : "Draft"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          disabled={!published || save.isPending}
          aria-pressed={featured}
          onClick={() => save.mutate({ published, featured: !featured })}
        >
          {featured ? "Featured" : "Feature"}
        </Button>
      </div>
      {save.error && (
        <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">
          {save.error.message}
        </p>
      )}
    </div>
  );
}
