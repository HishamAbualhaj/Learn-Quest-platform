"use client";
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
  user_data: User;
  courseData: Course;
}) {
  const router = useRouter();
  const { mutate, isPending, data } = useMutation({
    mutationFn: () =>
      useFetch(
        `${API_BASE_URL}/enrollCourse`,
        {
          student_id: user_data?.student_id,
          course_id: courseData.course_id,
          course_title: courseData.title,
          first_name: user_data?.first_name,
          email: user_data?.email,
        },
        "PUT",
      ),
    onSuccess: (result) => {
      if (result.status) router.refresh();
    },
  });
  return (
    <div className="mt-6">
      <button
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        onClick={() => mutate()}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-mainClr px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-mainClr/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mainClr disabled:cursor-wait disabled:opacity-70 dark:bg-mainClr dark:text-white dark:hover:bg-mainClr/90"
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
