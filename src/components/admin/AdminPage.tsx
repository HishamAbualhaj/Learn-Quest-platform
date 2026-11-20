import type { ReactNode } from "react";
import { Inbox, LoaderCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
export const adminPanel =
  "rounded-md border border-borderLight bg-white dark:border-borderDark dark:bg-lightDark/40";
export function AdminHeading({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="mb-2 text-sm font-medium text-mainClr dark:text-mainClrDark">
          Administration
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
export function AdminEmpty({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center px-5 py-16 text-center">
      <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-mainClr/10 text-mainClr dark:text-mainClrDark">
        <Inbox aria-hidden="true" className="size-6" />
      </span>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
export function AdminFeedback({
  loading,
  error,
  retry,
  label = "Loading data",
}: {
  loading?: boolean;
  error?: unknown;
  retry?: () => void;
  label?: string;
}) {
  if (error)
    return (
      <div
        role="alert"
        className="flex flex-wrap items-center justify-center gap-3 p-6 text-sm"
      >
        <TriangleAlert
          aria-hidden="true"
          className="size-5 text-red-600 dark:text-red-300"
        />
        <span>We couldn't load this data. Please try again.</span>
        {retry && (
          <Button variant="outline" className="min-h-11" onClick={retry}>
            Try again
          </Button>
        )}
      </div>
    );
  if (loading)
    return (
      <div
        role="status"
        className="flex items-center justify-center gap-3 p-8 text-sm text-muted-foreground"
      >
        <LoaderCircle
          aria-hidden="true"
          className="size-5 animate-spin motion-reduce:animate-none"
        />
        {label}...
      </div>
    );
  return null;
}

export function AdminNotice({
  message,
  success = false,
}: {
  message: string;
  success?: boolean;
}) {
  return (
    <p
      role={success ? "status" : "alert"}
      className={`rounded-md border p-4 text-sm leading-7 break-words ${success ? "border-green-600/20 bg-green-500/10 text-green-800 dark:text-green-300" : "border-red-600/20 bg-red-500/10 text-red-800 dark:text-red-300"}`}
    >
      {message}
    </p>
  );
}
