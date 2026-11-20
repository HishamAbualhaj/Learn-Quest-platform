"use client";
import Link from "next/link";
import API_BASE_URL from "@/config/config";
import useFetch from "@/hooks/useFetch";
import { Course, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnrollCourse({
  user_data,
  courseData,
}: {
  user_data: Partial<User>;
  courseData: Course;
}) {
  const router = useRouter();
  const { mutate, isPending, data } = useMutation({
    mutationFn: () => {
      if (!user_data?.student_id)
        throw new Error("Sign in to enroll in this course.");
      return useFetch(
        `${API_BASE_URL}/enrollCourse`,
        {
          student_id: user_data?.student_id,
          course_id: courseData.course_id,
          course_title: courseData.title,
          first_name: user_data?.first_name,
          email: user_data?.email,
        },
        "PUT",
      );
    },
    onSuccess: (result) => {
      if (result.status) router.refresh();
    },
  });
  if (!user_data?.student_id)
    return (
      <div className="mt-6">
        <Link
          href="/login"
          className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-action px-5 py-3 text-sm font-semibold text-action-foreground hover:bg-action-hover"
        >
          Log in to enroll
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Create an account or sign in to start learning.
        </p>
      </div>
    );
  return (
    <div className="mt-6">
      <button
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        onClick={() => mutate()}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-action px-5 py-3 text-sm font-semibold text-action-foreground shadow-sm transition hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mainClr disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? (
          <>
            <LoaderCircle
              aria-hidden="true"
              className="size-4 animate-spin motion-reduce:animate-none"
            />
            Enrolling you...
          </>
        ) : (
          <>
            Enroll in this course
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </>
        )}
      </button>
      {data?.status === false && (
        <p
          role="alert"
          className="mt-3 text-sm leading-5 text-red-600 dark:text-red-400"
        >
          {String(data.msg)}
        </p>
      )}
      {data?.status === true && (
        <p
          role="status"
          className="mt-3 text-sm text-mainClr dark:text-mainClrDark"
        >
          You are enrolled. Getting your lessons ready...
        </p>
      )}
    </div>
  );
}
