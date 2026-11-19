"use client";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

export default function FeedStatus({
  loading,
  error,
  hasMore,
  empty,
  noun,
  onRetry,
  onLoadMore,
}: {
  loading: boolean;
  error: Error | null;
  hasMore?: boolean;
  empty: boolean;
  noun: "stories" | "comments";
  onRetry: () => void;
  onLoadMore: () => void;
}) {
  if (loading)
    return (
      <div
        role="status"
        className="mt-8 flex min-h-24 items-center justify-center gap-3 rounded-md border border-borderLight bg-lightLayout px-5 py-6 text-sm text-muted-foreground dark:border-borderDark dark:bg-lightDark/40"
      >
        <LoaderCircle
          aria-hidden="true"
          className="size-5 shrink-0 animate-spin text-mainClr motion-reduce:animate-none dark:text-mainClrDark"
        />
        <span>
          {empty ? `Getting ${noun} ready...` : `Loading more ${noun}...`}
        </span>
      </div>
    );
  if (error)
    return (
      <div
        role="alert"
        className="mt-8 rounded-md border border-borderLight bg-lightLayout px-5 py-6 text-center dark:border-borderDark dark:bg-lightDark/40"
      >
        <p className="text-sm leading-6 text-muted-foreground">
          {empty
            ? `We could not load the ${noun}.`
            : `The next ${noun} could not be loaded. Everything above is still here.`}
        </p>
        <Button type="button" onClick={onRetry} className="mt-4 min-h-11">
          <RefreshCw aria-hidden="true" className="size-4" />
          Try again
        </Button>
      </div>
    );
  if (empty) return null;
  if (hasMore)
    return (
      <div className="mt-8 flex flex-col items-center gap-3 py-5">
        <p className="text-sm text-muted-foreground">
          Keep scrolling to discover more {noun}.
        </p>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          onClick={onLoadMore}
        >
          Load more {noun}
        </Button>
      </div>
    );
  return (
    <div className="mt-8 flex items-center justify-center gap-4 py-6 text-sm text-muted-foreground">
      <span
        aria-hidden="true"
        className="h-px w-10 bg-borderLight dark:bg-borderDark"
      />
      <span>You are all caught up on {noun}.</span>
      <span
        aria-hidden="true"
        className="h-px w-10 bg-borderLight dark:bg-borderDark"
      />
    </div>
  );
}
