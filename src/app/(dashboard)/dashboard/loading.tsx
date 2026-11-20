import { LoaderCircle } from "lucide-react";
import { adminPanel } from "@/components/admin/AdminPage";
export default function Loading() {
  return (
    <div aria-busy="true">
      <p
        role="status"
        className="mb-8 flex items-center gap-3 text-sm text-muted-foreground"
      >
        <LoaderCircle
          aria-hidden="true"
          className="size-5 animate-spin motion-reduce:animate-none"
        />
        Getting your admin workspace ready...
      </p>
      <div
        aria-hidden="true"
        className="animate-pulse space-y-6 motion-reduce:animate-none"
      >
        <div className="h-9 w-2/3 max-w-md rounded-md bg-mainClr/10" />
        <div className="h-4 w-full max-w-lg rounded-md bg-mainClr/10" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${adminPanel} space-y-5 p-6`}>
              <div className="size-11 rounded-md bg-mainClr/10" />
              <div className="h-5 w-3/4 rounded-md bg-mainClr/10" />
              <div className="h-9 w-1/2 rounded-md bg-mainClr/10" />
            </div>
          ))}
        </div>
        <div className={`${adminPanel} h-64`} />
      </div>
    </div>
  );
}
