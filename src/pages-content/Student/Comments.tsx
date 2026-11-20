"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LoaderCircle, MessageSquare } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "@/components/Avatar";
import FeedStatus from "@/components/FeedStatus";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import { CommentType, User } from "@/types";

export default function Comments(
  user: Partial<User> & { blog_id: string; blog_title?: string },
) {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [lastNode, setLastNode] = useState<HTMLElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const {
    dataFetched: comments,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    refetch,
    loadMore,
  } = useInfiniteScroll<CommentType>({
    fetchFn: async (page) => {
      const result = await useFetch<CommentType>(
        `${API_BASE_URL}/getComments`,
        { page, blog_id: user.blog_id },
        "POST",
      );
      if (!result.status) throw new Error(String(result.msg));
      return result;
    },
    queryKey: ["comments", user.blog_id],
    viewportRoot: true,
    scrollContainer: container,
    observedEle: lastNode,
    data_id: "comment_id",
    retry: 1,
  });
  const submit = useMutation({
    mutationFn: () => {
      if (!user.student_id) throw new Error("Sign in to post a comment.");
      return useFetch(
        `${API_BASE_URL}/addComment`,
        { ...user, comment_text: text.trim() },
        "POST",
      );
    },
    onSuccess: (result) => {
      if (result.status) {
        setText("");
        setFeedback({
          success: true,
          message:
            "Your comment is posted. Thanks for joining the conversation.",
        });
        queryClient.invalidateQueries({ queryKey: ["comments", user.blog_id] });
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
          "Your comment could not be posted. Please try again. Your draft is still here.",
      }),
  });
  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-semibold tracking-wide text-mainClr dark:text-mainClrDark">
            GOOD IDEAS START CONVERSATIONS
          </span>
          <h2
            id="comments-heading"
            className="mt-3 text-3xl font-semibold tracking-tight"
          >
            What is your perspective?
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Share a thought, ask a question, or build on an idea.
          </p>
        </div>
        {comments.length > 0 && (
          <span className="rounded-md border border-borderLight px-3 py-2 text-sm text-muted-foreground dark:border-borderDark">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}{" "}
            shown
          </span>
        )}
      </div>
      {user.student_id ? (
        <form
          aria-label="Write a comment"
          className="mb-8 rounded-md border border-borderLight bg-lightLayout/60 p-5 dark:border-borderDark dark:bg-lightDark/40 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (submit.isPending) return;
            if (!text.trim()) {
              setFeedback({
                success: false,
                message: "Write a thought or question before posting.",
              });
              textarea.current?.focus();
              return;
            }
            setFeedback(null);
            submit.mutate();
          }}
        >
          <div className="mb-5 flex items-center gap-3">
            <Avatar img={user.image_url} className="size-10 shrink-0" />
            <div>
              <label
                htmlFor="article-comment"
                className="block text-sm font-semibold"
              >
                Add to the conversation
              </label>
              <p className="text-sm text-muted-foreground">
                Posting as {user.first_name || "you"}
              </p>
            </div>
          </div>
          <Textarea
            ref={textarea}
            id="article-comment"
            required
            disabled={submit.isPending}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setFeedback(null);
            }}
            placeholder="What stood out to you in this story?"
            className="min-h-32 resize-y leading-7"
          />
          {feedback && (
            <p
              role={feedback.success ? "status" : "alert"}
              className={`mt-4 rounded-md border px-4 py-3 text-sm leading-6 ${feedback.success ? "border-mainClr/20 bg-mainClr/5 text-mainClr dark:border-mainClrDark/25 dark:text-mainClrDark" : "border-red-500/25 bg-red-500/5 text-red-700 dark:text-red-300"}`}
            >
              {feedback.message}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Keep it thoughtful, helpful, and kind.
            </p>
            <Button
              type="submit"
              disabled={submit.isPending}
              aria-busy={submit.isPending}
              className="min-h-12"
            >
              {submit.isPending ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin motion-reduce:animate-none"
                  />
                  Posting your comment...
                </>
              ) : (
                <>
                  Post comment
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-8 rounded-md border border-borderLight bg-lightLayout px-6 py-6 dark:border-borderDark dark:bg-lightDark">
          <p className="text-sm text-muted-foreground">
            Log in to share your perspective with the learning community.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex min-h-11 items-center rounded-md bg-action px-5 text-sm font-semibold text-action-foreground hover:bg-action-hover"
          >
            Log in to comment
          </Link>
        </div>
      )}
      <div ref={container} aria-busy={isFetching} className="space-y-5">
        {comments.map((comment, index) => {
          const date = new Date(comment.created_date);
          const validDate = !Number.isNaN(date.getTime());
          return (
            <article
              key={comment.comment_id}
              ref={index === comments.length - 1 ? setLastNode : undefined}
              className="rounded-md border border-borderLight bg-white p-5 dark:border-borderDark dark:bg-lightDark/20 sm:p-6"
            >
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar
                    img={comment.image_url}
                    className="size-10 shrink-0"
                  />
                  <h3 className="break-words text-sm font-semibold">
                    {comment.first_name}
                  </h3>
                </div>
                {validDate && (
                  <time
                    dateTime={date.toISOString()}
                    className="text-sm text-muted-foreground"
                  >
                    {date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </header>
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-lightText/85 dark:text-textDark">
                {comment.comment_text}
              </p>
            </article>
          );
        })}
        {isFetching && (
          <div aria-hidden="true" className="space-y-5">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="space-y-5 rounded-md border border-borderLight p-6 dark:border-borderDark"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
                  <div className="h-4 w-36 rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
                </div>
                <div className="h-4 w-full rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
                <div className="h-4 w-3/4 rounded-md bg-mainClr/10 motion-safe:animate-pulse dark:bg-mainClrDark/10" />
              </div>
            ))}
          </div>
        )}
        {!isFetching && !error && !comments.length && (
          <div className="rounded-md border border-dashed border-input px-6 py-12 text-center">
            <MessageSquare
              aria-hidden="true"
              className="mx-auto mb-4 size-8 text-mainClr dark:text-mainClrDark"
            />
            <h3 className="text-lg font-semibold">
              Be the first to start a conversation.
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A thoughtful question or a new perspective can make this story go
              further.
            </p>
          </div>
        )}
      </div>
      <FeedStatus
        loading={isFetching}
        error={error}
        empty={!comments.length}
        hasMore={hasNextPage}
        noun="comments"
        onRetry={isFetchingNextPage || comments.length ? loadMore : refetch}
        onLoadMore={loadMore}
      />
    </>
  );
}
