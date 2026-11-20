"use client";

import ErrorPage from "@/components/feedback/ErrorPage";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage error={error} />;
}
