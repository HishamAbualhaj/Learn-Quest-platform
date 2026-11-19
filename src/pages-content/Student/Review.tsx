"use client";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, LoaderCircle, MessageSquare } from "lucide-react";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating, RatingDisplay } from "@/components/ui/star-rating";
import useFetch from "@/hooks/useFetch";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import API_BASE_URL from "@/config/config";
import { ReviewType, User } from "@/types";

export default function Review(
  user: User & { course_id: string; course_title: string },
) {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [readError, setReadError] = useState<string | null>(null);
  const [lastNode, setLastNode] = useState<HTMLElement | null>(null);
  const reviewContainer = useRef<HTMLDivElement | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const {
    dataFetched: reviews,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteScroll<ReviewType>({
    fetchFn: async (page) => {
      const result = await useFetch<ReviewType>(
        `${API_BASE_URL}/getReviews`,
        { page, course_id: user.course_id },
        "POST",
      );
      setReadError(result.status ? null : String(result.msg));
      return result;
    },
    queryKey: ["reviews", user.course_id],
    viewportRoot: true,
    scrollContainer: reviewContainer,
    observedEle: lastNode,
    data_id: "review_id",
  });
  const submit = useMutation({
    mutationFn: () =>
      useFetch(
        `${API_BASE_URL}/addReview`,
        { ...user, review_text: text.trim(), stars: rating },
        "POST",
      ),
    onSuccess: (result) => {
      if (result.status) {
        setFeedback({
          success: true,
          message:
            "Thank you for sharing your experience. Your review has been posted.",
        });
        setText("");
        setRating(0);
        queryClient.invalidateQueries({
          queryKey: ["reviews", user.course_id],
        });
      } else
        setFeedback({
          success: false,
          message: Array.isArray(result.msg)
            ? result.msg.join(", ")
            : String(result.msg),
        });
    },
    onError: () =>
      setFeedback({
        success: false,
        message:
          "Your review could not be posted. Please try again. Your draft is still here.",
      }),
  });
  const validRatings = reviews
    .map((review) => Number(review.stars))
    .filter((stars) => stars >= 1 && stars <= 5);
  const average = validRatings.length
    ? validRatings.reduce((sum, stars) => sum + stars, 0) / validRatings.length
    : 0;
  return (
    <div className="py-6" aria-labelledby="reviews-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="text-sm font-semibold tracking-wide text-mainClr dark:text-mainClrDark">
            THE LEARNER PERSPECTIVE
          </span>
          <h2
            id="reviews-heading"
            className="mt-3 text-3xl font-semibold tracking-tight"
          >
            Learning, in their words.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Honest experiences to help you take your next step.
          </p>
        </div>
        {validRatings.length > 0 && (
          <div className="rounded-md border border-borderLight bg-lightLayout px-5 py-4 dark:border-borderDark dark:bg-lightDark">
            <div className="flex flex-wrap items-center gap-3">
              <strong className="text-2xl tracking-tight">
                {average.toFixed(1)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  / 5
                </span>
              </strong>
              <RatingDisplay value={average} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Average of {validRatings.length}{" "}
              {validRatings.length === 1 ? "review" : "reviews"} shown
            </p>
          </div>
        )}
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-10">
        <div className="min-w-0 rounded-md border border-borderLight bg-lightLayout/60 p-5 dark:border-borderDark dark:bg-lightDark/50 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <Avatar img={user.image_url} className="size-11 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Share your experience
              </h3>
              <p className="text-sm text-muted-foreground">
                {user.first_name
                  ? `Reviewing as ${user.first_name}`
                  : "Your perspective matters."}
              </p>
            </div>
          </div>
          <form
            aria-label="Write a course review"
            onSubmit={(event) => {
              event.preventDefault();
              if (submit.isPending) return;
              if (!rating) {
                setFeedback({
                  success: false,
                  message: "Choose a star rating before posting your review.",
                });
                return;
              }
              if (!text.trim()) {
                setFeedback({
                  success: false,
                  message:
                    "Write a little about your experience before posting.",
                });
                textarea.current?.focus();
                return;
              }
              setFeedback(null);
              submit.mutate();
            }}
          >
            <StarRating
              value={rating}
              onChange={(value) => {
                setRating(value);
                setFeedback(null);
              }}
              disabled={submit.isPending}
            />
            <label
              htmlFor="course-review-text"
              className="mt-6 mb-3 block text-sm font-medium"
            >
              Your review{" "}
              <span className="text-muted-foreground">(required)</span>
            </label>
            <Textarea
              ref={textarea}
              id="course-review-text"
              required
              disabled={submit.isPending}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setFeedback(null);
              }}
              placeholder="What did you enjoy? What should the next learner know?"
              className="min-h-36 resize-y leading-6"
            />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A few thoughtful words can help someone find their next chapter.
            </p>
            {feedback && (
              <p
                role={feedback.success ? "status" : "alert"}
                className={`mt-4 rounded-md border px-3 py-3 text-sm leading-6 ${feedback.success ? "border-mainClr/20 bg-mainClr/5 text-mainClr dark:border-mainClrDark/30 dark:text-mainClrDark" : "border-red-500/25 bg-red-500/5 text-red-700 dark:text-red-300"}`}
              >
                {feedback.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={submit.isPending}
              aria-busy={submit.isPending}
              className="mt-5 min-h-12 w-full"
            >
              {submit.isPending ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin motion-reduce:animate-none"
                  />
                  Posting your review...
                </>
              ) : (
                <>
                  Post review
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </>
              )}
            </Button>
          </form>
        </div>
        <div
          ref={reviewContainer}
          className="min-w-0 space-y-5"
          aria-label="Learner reviews"
        >
          {readError && (
            <div
              role="alert"
              className="rounded-md border border-borderLight p-5 dark:border-borderDark"
            >
              <p className="text-sm text-muted-foreground">
                We could not load the reviews. {readError}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 min-h-11 text-sm font-medium text-mainClr underline dark:text-mainClrDark"
              >
                Try again
              </button>
            </div>
          )}
          {reviews.map((review, index) => {
            const date = new Date(review.review_date);
            const validDate = !Number.isNaN(date.getTime());
            return (
              <article
                key={review.review_id}
                ref={index === reviews.length - 1 ? setLastNode : undefined}
                className="rounded-md border border-borderLight bg-white p-5 dark:border-borderDark dark:bg-lightDark/30 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar
                      img={review.image_url}
                      className="size-10 shrink-0"
                    />
                    <div>
                      <h3 className="break-words text-sm font-semibold">
                        {review.first_name}
                      </h3>
                      {validDate && (
                        <time
                          dateTime={date.toISOString()}
                          className="mt-1 block text-sm text-muted-foreground"
                        >
                          {date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      )}
                    </div>
                  </div>
                  <RatingDisplay value={review.stars} />
                </div>
                <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-lightText/85 dark:text-textDark">
                  {review.review_text}
                </p>
              </article>
            );
          })}
          {isFetching && (
            <div
              role="status"
              className="rounded-md border border-borderLight p-6 dark:border-borderDark"
            >
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin motion-reduce:animate-none"
                />
                {isFetchingNextPage
                  ? "Getting more learner perspectives..."
                  : "Getting learner reviews ready..."}
              </span>
            </div>
          )}
          {!isFetching && !readError && !reviews.length && (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-input px-6 py-10 text-center">
              <MessageSquare
                aria-hidden="true"
                className="mb-4 size-8 text-mainClr dark:text-mainClrDark"
              />
              <h3 className="text-lg font-semibold">Be the first to share.</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Your experience could be the insight another learner needs.
              </p>
            </div>
          )}
          {reviews.length > 0 && !hasNextPage && !isFetching && !readError && (
            <p className="py-2 text-center text-sm text-muted-foreground">
              You are all caught up on learner reviews.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
