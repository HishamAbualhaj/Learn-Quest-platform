"use client";
import * as React from "react";
import { Input as ShadcnInput } from "./input";
import { DatePicker } from "./date-picker";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type, ...props }, ref) {
  if (type === "date") return <DatePicker className={className} {...props} />;
  return (
    <ShadcnInput
      ref={ref}
      type={type}
      className={cn(
        className,
        "form-control rounded-md border-input bg-control text-sm dark:border-input dark:bg-control",
      )}
      {...props}
    />
  );
});
