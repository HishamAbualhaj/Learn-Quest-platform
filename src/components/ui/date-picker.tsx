"use client";
import * as React from "react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

export function DatePicker({
  className,
  onChange,
  value,
  defaultValue,
  id,
  name,
  disabled,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(String(defaultValue ?? ""));
  const inputRef = React.useRef<HTMLInputElement>(null);
  const current = String(value ?? internal).trim();
  const parsed = current ? parseISO(current) : undefined;
  const selected = parsed && isValid(parsed) ? parsed : undefined;
  React.useEffect(() => {
    const valid =
      !current ||
      Boolean(selected && format(selected, "yyyy-MM-dd") === current);
    inputRef.current?.setCustomValidity(
      valid ? "" : "Enter a valid date in YYYY-MM-DD format.",
    );
  }, [current]);
  const update = (next: string) => {
    setInternal(next);
    onChange?.({
      target: { id, name, value: next },
      currentTarget: { id, name, value: next },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("relative w-full", className)}>
        <input
          {...props}
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          required={required}
          value={current}
          onChange={(e) => update(e.target.value)}
          placeholder="YYYY-MM-DD"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          className="form-control w-full pr-12"
        />
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Choose ${props["aria-label"] ?? (id === "birthdate" || id === "3" ? "date of birth" : "date")}`}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"
          >
            <CalendarIcon className="size-4" />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent align="start" className="w-auto border-input p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selected}
          defaultMonth={selected ?? new Date(2000, 0)}
          startMonth={new Date(1900, 0)}
          endMonth={new Date(new Date().getFullYear() + 5, 11)}
          onSelect={(day) => {
            update(day ? format(day, "yyyy-MM-dd") : "");
            setOpen(false);
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
