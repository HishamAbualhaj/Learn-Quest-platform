"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefreshOverview() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      variant="outline"
      aria-busy={pending}
      disabled={pending}
      className="min-h-11"
      onClick={() => startTransition(() => router.refresh())}
    >
      <RefreshCw
        aria-hidden="true"
        className={`size-4 ${pending ? "animate-spin motion-reduce:animate-none" : ""}`}
      />
      {pending ? "Refreshing..." : "Refresh overview"}
    </Button>
  );
}
