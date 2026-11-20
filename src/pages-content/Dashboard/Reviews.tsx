"use client";
import { useRef, useState } from "react";
import { Star, BookOpen } from "lucide-react";
import { FormSelect } from "@/components/ui/form-select";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/shared/Avatar";
import {
  AdminHeading,
  AdminEmpty,
  AdminFeedback,
  adminPanel,
} from "@/components/admin/AdminPage";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import type { Course, ReviewType } from "@/types";
export default function Reviews({ courses }: { courses: Course[] }) {
  const [courseId, setCourseId] = useState("");
  const container = useRef<HTMLDivElement | null>(null);
  const available = Array.isArray(courses) ? courses : [];
  const { dataFetched, isFetching, hasNextPage, loadMore, refetch, error } =
    useInfiniteScroll<ReviewType>({
      fetchFn: async (page) => {
        if (!courseId) return { status: true, redirect: false, msg: [] };
        const res = await useFetch(
          `${API_BASE_URL}/getReviews`,
          { page, course_id: courseId },
          "POST",
        );
        if (!res.status) throw new Error(String(res.msg));
        return res;
      },
      queryKey: ["admin_reviews", courseId],
      scrollContainer: container,
      observedEle: null,
      data_id: "review_id",
      retry: 1,
    });
  return (
    <>
      <AdminHeading
        title="Learner reviews"
        description="Listen to your learners and understand how each course is being received."
      />
      <section
        className={`${adminPanel} mb-6 flex flex-wrap items-center justify-between gap-5 p-5`}
      >
        <div className="flex items-center gap-3">
          <BookOpen
            aria-hidden="true"
            className="size-5 text-mainClr dark:text-mainClrDark"
          />
          <div>
            <h2 className="font-semibold">Explore course feedback</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a course to read its learner reviews.
            </p>
          </div>
        </div>
        <div className="w-full sm:max-w-sm">
          <label
            htmlFor="review-course"
            className="mb-2 block text-sm font-medium"
          >
            Course
          </label>
          <FormSelect
            id="review-course"
            className="w-full"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Choose a course</option>
            {available.map((course) => (
              <option key={course.course_id} value={String(course.course_id)}>
                {course.title}
              </option>
            ))}
          </FormSelect>
        </div>
      </section>
      <div ref={container}>
        {!courseId ? (
          <div className={adminPanel}>
            <AdminEmpty
              title="A little listening goes a long way."
              description={
                available.length
                  ? "Choose a course above to explore ratings and written feedback."
                  : "No courses are available to review yet."
              }
            />
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {dataFetched.length} reviews loaded for this course
            </p>
            <div className="grid gap-5 xl:grid-cols-2">
              {dataFetched.map((review) => (
                <article key={review.review_id} className={`${adminPanel} p-6`}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      img={review.image_url}
                      className="size-11 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold break-words">
                        {review.first_name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {String(review.review_date ?? "").split("T")[0]}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-md bg-mainClr/10 px-2.5 py-2 text-sm font-medium text-mainClr dark:text-mainClrDark">
                      <Star
                        aria-hidden="true"
                        className="size-4 fill-current"
                      />
                      {review.stars}
                      <span className="sr-only">out of 5 stars</span>
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 whitespace-pre-wrap break-words text-lightText dark:text-textDark">
                    {review.review_text}
                  </p>
                </article>
              ))}
            </div>
            {!dataFetched.length && !isFetching && !error && (
              <div className={adminPanel}>
                <AdminEmpty
                  title="The first review is still to come."
                  description="Feedback will appear here when learners review this course."
                />
              </div>
            )}
            <AdminFeedback
              loading={isFetching}
              error={error}
              retry={refetch}
              label="Loading reviews"
            />
            {hasNextPage && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="min-h-11"
                  disabled={isFetching}
                  onClick={loadMore}
                >
                  Load more reviews
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
