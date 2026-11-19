import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        className,
        "form-control min-h-24 w-full rounded-md border-input bg-control dark:border-input dark:bg-control focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
      )}
      {...props}
    />
  );
});
