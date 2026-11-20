"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "radix-ui";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form-input";
import { Textarea } from "@/components/ui/textarea";
import {
  AdminHeading,
  AdminEmpty,
  AdminFeedback,
  AdminNotice,
  adminPanel,
} from "@/components/admin/AdminPage";
import PublicationControls from "@/components/admin/PublicationControls";
import ContentVisibility from "@/components/admin/ContentVisibility";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
type Item = {
  content_id?: string;
  question?: string;
  answer?: string;
  name?: string;
  role?: string;
  quote?: string;
  stars?: number;
  sort_order: number;
  published: boolean | number;
  featured: boolean | number;
};
const blank = (): Item => ({
  question: "",
  answer: "",
  name: "",
  role: "",
  quote: "",
  stars: 5,
  sort_order: 0,
  published: false,
  featured: false,
});
export default function ManagedContent({
  kind,
}: {
  kind: "faqs" | "testimonials";
}) {
  const faq = kind === "faqs",
    label = faq ? "FAQ" : "testimonial";
  const [draft, setDraft] = useState<Item>(blank);
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const [deleting, setDeleting] = useState<Item | null>(null);
  const cache = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", kind, page],
    queryFn: async () => {
      const res = await useFetch<Item[]>(
        `${API_BASE_URL}/getContentAdmin`,
        { kind, page },
        "POST",
      );
      if (!res.status || !Array.isArray(res.msg))
        throw new Error(String(res.msg));
      return { items: res.msg, nextPage: res.nextPage };
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const save = useMutation({
    mutationFn: async () => {
      const res = await useFetch(
        `${API_BASE_URL}/saveManagedContent`,
        { kind, ...draft },
        "POST",
      );
      if (!res.status) throw new Error(String(res.msg));
    },
    onSuccess: () => {
      setDraft(blank());
      setNotice(`${faq ? "FAQ" : "Testimonial"} saved.`);
      void cache.invalidateQueries({ queryKey: ["admin", kind] });
    },
  });
  const remove = useMutation({
    mutationFn: async () => {
      const res = await useFetch(
        `${API_BASE_URL}/deleteManagedContent`,
        { kind, content_id: deleting?.content_id },
        "POST",
      );
      if (!res.status) throw new Error(String(res.msg));
    },
    onSuccess: () => {
      if (deleting?.content_id === draft.content_id) setDraft(blank());
      setDeleting(null);
      void cache.invalidateQueries({ queryKey: ["admin", kind] });
    },
  });
  const fields = faq
    ? [
        { key: "question", label: "Question" },
        { key: "answer", label: "Answer", long: true },
      ]
    : [
        { key: "name", label: "Learner name" },
        { key: "role", label: "Role or title" },
        { key: "quote", label: "Testimonial", long: true },
      ];
  return (
    <>
      <AdminHeading
        title={faq ? "Frequently asked questions" : "Testimonials"}
        description={
          faq
            ? "Give visitors clear answers before they take their next step."
            : "Choose learner stories that represent your platform."
        }
        actions={
          <Button
            className="min-h-11"
            onClick={() => {
              setDraft(blank());
              setNotice("");
              document
                .getElementById("content-editor")
                ?.scrollIntoView({ block: "start" });
            }}
          >
            <Plus aria-hidden="true" />
            New {label}
          </Button>
        }
      />
      <form
        id="content-editor"
        aria-label={`Edit ${label}`}
        onSubmit={(e) => {
          e.preventDefault();
          setNotice("");
          save.mutate();
        }}
        className={`${adminPanel} mb-8 scroll-mt-6 space-y-5 p-5 md:p-7`}
      >
        <h2 className="text-xl font-semibold">
          {draft.content_id ? "Edit" : "Create"} {label}
        </h2>
        {fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`content-${field.key}`}
              className="mb-2 block text-sm font-medium"
            >
              {field.label}
            </label>
            {field.long ? (
              <Textarea
                id={`content-${field.key}`}
                required
                value={String(draft[field.key] ?? "")}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="min-h-32"
              />
            ) : (
              <Input
                id={`content-${field.key}`}
                required
                value={String(draft[field.key] ?? "")}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
              />
            )}
          </div>
        ))}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="content-order"
              className="mb-2 block text-sm font-medium"
            >
              Display order
            </label>
            <Input
              id="content-order"
              type="number"
              min={0}
              step={1}
              required
              value={draft.sort_order}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  sort_order: Number(e.target.value),
                }))
              }
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Lower numbers appear first.
            </p>
          </div>
          {!faq && (
            <div>
              <label
                htmlFor="content-stars"
                className="mb-2 block text-sm font-medium"
              >
                Stars
              </label>
              <Input
                id="content-stars"
                type="number"
                min={1}
                max={5}
                step={1}
                required
                value={draft.stars}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    stars: Number(e.target.value),
                  }))
                }
              />
            </div>
          )}
        </div>
        <PublicationControls
          value={draft}
          disabled={save.isPending}
          onChange={(flags) => setDraft((prev) => ({ ...prev, ...flags }))}
        />
        {save.error && <AdminNotice message={save.error.message} />}
        {notice && <AdminNotice success message={notice} />}
        <div className="flex justify-end gap-3">
          {draft.content_id && (
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              onClick={() => setDraft(blank())}
            >
              Cancel edit
            </Button>
          )}
          <Button type="submit" className="min-h-11" disabled={save.isPending}>
            {save.isPending ? "Saving..." : `Save ${label}`}
          </Button>
        </div>
      </form>
      <section className={adminPanel} aria-label={`${label} list`}>
        <div className="flex items-center justify-between border-b border-input p-5">
          <h2 className="text-xl font-semibold">
            {faq ? "All FAQs" : "All testimonials"}
          </h2>
          <Button
            variant="outline"
            className="min-h-11"
            disabled={query.isFetching}
            onClick={() => void query.refetch()}
          >
            Refresh
          </Button>
        </div>
        <AdminFeedback
          loading={query.isFetching}
          error={query.error}
          retry={() => void query.refetch()}
        />
        {query.data?.items.map((item) => (
          <article
            key={item.content_id}
            className="space-y-4 border-b border-input p-5 last:border-b-0"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="w-full min-w-0 sm:flex-1">
                <h3 className="text-lg font-semibold break-words">
                  {faq ? item.question : item.name}
                </h3>
                {!faq && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.role} ? {item.stars}/5 stars
                  </p>
                )}
                <p className="mt-3 text-sm leading-7 whitespace-pre-wrap break-words text-muted-foreground">
                  {faq ? item.answer : item.quote}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Display order: {item.sort_order}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="min-h-11"
                  onClick={() => {
                    setDraft(item);
                    save.reset();
                    setNotice("");
                    document
                      .getElementById("content-editor")
                      ?.scrollIntoView({ block: "start" });
                  }}
                >
                  <Pencil aria-hidden="true" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="min-h-11 text-red-700 dark:text-red-300"
                  onClick={() => {
                    remove.reset();
                    setDeleting(item);
                  }}
                  aria-label={`Delete ${faq ? item.question : item.name}`}
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </div>
            </div>
            <ContentVisibility kind={kind} id={item.content_id!} value={item} />
          </article>
        ))}
        {!query.isFetching && !query.error && !query.data?.items.length && (
          <AdminEmpty
            title={`No ${faq ? "FAQs" : "testimonials"} yet`}
            description={`Create your first ${label} above.`}
          />
        )}
        <div className="flex items-center justify-between gap-3 border-t border-input p-5">
          <Button
            variant="outline"
            className="min-h-11"
            disabled={page === 1 || query.isFetching}
            onClick={() => setPage((value) => value - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <Button
            variant="outline"
            className="min-h-11"
            disabled={!query.data?.nextPage || query.isFetching}
            onClick={() => setPage(query.data!.nextPage!)}
          >
            Next
          </Button>
        </div>
      </section>
      <Dialog.Root
        open={Boolean(deleting)}
        onOpenChange={(open) => {
          if (!open && !remove.isPending) setDeleting(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/60" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[71] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-input bg-white p-6 text-lightText outline-none dark:bg-dark dark:text-white">
            <Dialog.Title className="text-xl font-semibold">
              Delete {label}?
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-7 text-muted-foreground">
              This permanently removes the item from your platform and landing
              page.
            </Dialog.Description>
            {remove.error && <AdminNotice message={remove.error.message} />}
            <div className="mt-6 flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button
                  variant="outline"
                  className="min-h-11"
                  disabled={remove.isPending}
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                className="min-h-11 bg-red-700 text-white hover:bg-red-800"
                disabled={remove.isPending}
                onClick={() => remove.mutate()}
              >
                {remove.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
