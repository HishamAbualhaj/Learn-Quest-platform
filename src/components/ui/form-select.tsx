"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

/** Native-style adapter so existing field handlers and submitted values stay intact. */
export function FormSelect({
  children,
  className,
  onChange,
  value,
  defaultValue,
  id,
  name,
  disabled,
  required,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const options = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map(
      (child) =>
        (
          child as React.ReactElement<
            React.OptionHTMLAttributes<HTMLOptionElement>
          >
        ).props,
    );
  const [internal, setInternal] = React.useState(
    String(defaultValue ?? options[0]?.value ?? ""),
  );
  const selected = String(value ?? internal);
  return (
    <Select
      name={name || id}
      value={selected}
      disabled={disabled}
      required={required}
      onValueChange={(next) => {
        const nextValue = next === "__empty__" ? "" : next;
        setInternal(nextValue);
        onChange?.({
          target: { id, name, value: nextValue },
          currentTarget: { id, name, value: nextValue },
        } as React.ChangeEvent<HTMLSelectElement>);
      }}
    >
      <SelectTrigger
        id={id || undefined}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        className={cn(
          className,
          "form-control h-11 w-full rounded-md border-input bg-control text-sm dark:border-input dark:bg-control dark:hover:bg-control",
        )}
      >
        <SelectValue
          placeholder={
            options.find((option) => String(option.value ?? "") === "")
              ?.children ?? "Select an option"
          }
        />
      </SelectTrigger>
      <SelectContent
        position="popper"
        align="start"
        className="min-w-[var(--radix-select-trigger-width)] border-input"
      >
        {options.map((option, index) => (
          <SelectItem
            key={String(option.value ?? index)}
            value={String(option.value ?? "") || "__empty__"}
            disabled={option.disabled}
            className="cursor-pointer text-sm"
          >
            {option.children}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
