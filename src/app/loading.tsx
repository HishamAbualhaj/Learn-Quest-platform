export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-40 items-center justify-center gap-3 p-6">
      <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      <span>Loading page…</span>
    </div>
  );
}
