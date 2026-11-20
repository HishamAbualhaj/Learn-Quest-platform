"use client";
import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(function Switch({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "group relative inline-flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 inset-y-2 rounded-md border border-input bg-control group-data-[state=checked]:border-action group-data-[state=checked]:bg-action"
      />
      <SwitchPrimitive.Thumb className="pointer-events-none relative block size-5 translate-x-[-14px] rounded-md bg-muted-foreground shadow-sm transition-transform data-[state=checked]:translate-x-[14px] data-[state=checked]:bg-action-foreground" />
    </SwitchPrimitive.Root>
  );
});
