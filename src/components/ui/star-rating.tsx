"use client";
import { useId, useState } from "react";
import { Star } from "lucide-react";

const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export function StarRating({
  value,
  onChange,
  disabled = false,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const [hovered, setHovered] = useState(0);
  return (
    <fieldset disabled={disabled} aria-describedby={`${id}-hint`}>
      <legend className="mb-3 text-sm font-medium">
        Your rating <span className="text-muted-foreground">(required)</span>
      </legend>
      <div className="flex w-fit gap-2" onMouseLeave={() => setHovered(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={star}
            className="cursor-pointer"
            onMouseEnter={() => {
              if (!disabled) setHovered(star);
            }}
          >
            <input
              type="radio"
              name={`rating-${id}`}
              value={star}
              checked={value === star}
              required
              onFocus={() => setHovered(0)}
              onChange={() => {
                setHovered(0);
                onChange(star);
              }}
              aria-label={`${star} ${star === 1 ? "star" : "stars"}: ${labels[star]}`}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex size-11 items-center justify-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring peer-disabled:cursor-wait peer-disabled:opacity-60 ${star <= (hovered || value) ? "border-amber-600/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/40 dark:text-amber-300" : "border-input bg-control text-muted-foreground hover:border-mainClr dark:hover:border-mainClrDark"}`}
            >
              <Star
                className="size-6"
                fill={star <= (hovered || value) ? "currentColor" : "none"}
                strokeWidth={1.75}
              />
            </span>
          </label>
        ))}
      </div>
      <p
        id={`${id}-hint`}
        aria-live="polite"
        className="mt-3 min-h-6 text-sm text-muted-foreground"
      >
        {value
          ? `${value} out of 5 — ${labels[value]}`
          : "Choose from 1 to 5 stars."}
      </p>
    </fieldset>
  );
}

export function RatingDisplay({ value }: { value: number }) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className="size-4 shrink-0"
          fill={star <= Math.round(rating) ? "currentColor" : "none"}
          strokeWidth={1.75}
        />
      ))}
    </span>
  );
}
