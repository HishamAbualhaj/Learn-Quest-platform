"use client";
import { useEffect, useState } from "react";
import { Check, LockKeyhole, Play, LoaderCircle } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import API_BASE_URL from "@/config/config";

export default function CourseVideos({
  student_id,
  course_id,
  lessons,
  email,
  first_name,
  material_id,
  title,
  subtitle,
  isCompleted,
  url,
  setVideoUrl,
  isEnrolled,
  refetch,
  number = 1,
  isActive = false,
}) {
  const [checked, setChecked] = useState(Boolean(isCompleted));
  useEffect(() => setChecked(Boolean(isCompleted)), [isCompleted]);
  const locked = !isEnrolled && !url;
  const { mutate, isPending, data } = useMutation({
    mutationFn: () =>
      useFetch(
        `${API_BASE_URL}/completeCourse`,
        {
          user_id: student_id,
          course_id,
          lessons,
          email,
          first_name,
          id: material_id,
          value: checked,
          title,
        },
        "PUT",
      ),
    onSuccess: (result) => {
      if (result.status) {
        setChecked((previous) => !previous);
        refetch();
      }
    },
  });
  return (
    <li
      className={`border-b border-borderLight last:border-b-0 dark:border-borderDark ${isActive ? "bg-mainClr/5 dark:bg-mainClrDark/10" : ""}`}
    >
      <div className="flex items-center gap-1 px-2">
        {isEnrolled && (
          <button
            type="button"
            aria-label={`${checked ? "Mark incomplete" : "Mark complete"}: ${title}`}
            aria-pressed={checked}
            disabled={isPending}
            onClick={() => mutate()}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-mainClr disabled:cursor-wait dark:text-mainClrDark"
          >
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />
            ) : (
              <span
                className={`flex size-5 items-center justify-center rounded-md border ${checked ? "border-mainClr bg-mainClr text-white dark:border-mainClrDark dark:bg-mainClr dark:text-white" : "border-input"}`}
              >
                {checked && <Check className="size-3" />}
              </span>
            )}
          </button>
        )}
        <button
          type="button"
          disabled={locked || !url}
          aria-current={isActive ? "true" : undefined}
          onClick={() => {
            if (url) setVideoUrl(url);
          }}
          className="group flex min-h-24 min-w-0 flex-1 items-start gap-3 rounded-md px-3 py-5 text-left transition-colors enabled:cursor-pointer enabled:hover:bg-lightLayout disabled:cursor-default dark:enabled:hover:bg-hoverDark"
        >
          {!isEnrolled && (
            <span
              className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md text-sm ${locked ? "bg-lightLayout text-muted-foreground dark:bg-hoverDark" : "bg-mainClr/10 text-mainClr dark:bg-mainClrDark/15 dark:text-mainClrDark"}`}
            >
              {locked ? (
                <LockKeyhole aria-hidden="true" className="size-3.5" />
              ) : (
                <Play aria-hidden="true" className="size-3.5" />
              )}
            </span>
          )}
          {isEnrolled && (
            <span className="mt-1 text-sm tabular-nums text-muted-foreground">
              {String(number).padStart(2, "0")}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span
              className={`block text-sm leading-5 font-medium ${isActive ? "text-mainClr dark:text-mainClrDark" : "text-lightText dark:text-white"}`}
            >
              {title}
            </span>
            {subtitle && (
              <span className="mt-1 block text-sm leading-6 text-lightText/80 dark:text-white/85">
                {subtitle}
              </span>
            )}
            {!isEnrolled && (
              <span
                className={`mt-2 inline-flex items-center gap-1 text-sm ${locked ? "text-muted-foreground" : "font-medium text-mainClr dark:text-mainClrDark"}`}
              >
                {locked ? "Enroll to unlock" : "Free preview"}
              </span>
            )}
          </span>
          {isActive && (
            <span className="mt-1 text-sm font-medium text-mainClr dark:text-mainClrDark">
              Playing
            </span>
          )}
        </button>
      </div>
      {data?.status === false && (
        <p
          role="alert"
          className="px-5 pb-3 text-sm text-red-600 dark:text-red-400"
        >
          {String(data.msg)}
        </p>
      )}
    </li>
  );
}
