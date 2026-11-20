"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { imageUrl } from "@/lib/imageUrl";
import { readingTimeMinutes } from "@/lib/readingTime";
import PageIntro from "@/components/layout/PageIntro";
import FeedStatus from "@/components/feedback/FeedStatus";
import BlogSkeleton from "@/components/blogs/BlogSkeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import { BlogType } from "@/types";

export default function Blog() {
  const [lastNode, setLastNode] = useState<HTMLElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const {
    dataFetched: blogs,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    refetch,
    loadMore,
  } = useInfiniteScroll<BlogType>({
    fetchFn: async (page) => {
      const result = await useFetch<BlogType>(
        `${API_BASE_URL}/getBlogData`,
        { page },
        "POST",
      );
      if (!result.status) throw new Error(String(result.msg));
      return result;
    },
    queryKey: ["blogs"],
    viewportRoot: true,
    scrollContainer: container,
    observedEle: lastNode,
    data_id: "blog_id",
    retry: 1,
  });
  return (
    <>
      <PageIntro
        eyebrow="THE LEARNQUEST JOURNAL"
        title="Ideas worth exploring."
        description="Fresh perspectives, practical insights, and a little inspiration for your next chapter."
      />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          A little inspiration goes a long way.
        </h2>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen aria-hidden="true" className="size-4" />
          Read. Reflect. Keep growing.
        </span>
      </div>
      <div ref={container} aria-busy={isFetching}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog, index) => (
            <article
              key={blog.blog_id}
              ref={index === blogs.length - 1 ? setLastNode : undefined}
              className={`group overflow-hidden rounded-md border border-borderLight bg-white transition-shadow hover:shadow-md dark:border-borderDark dark:bg-lightDark/30 ${index === 0 ? "md:col-span-2 xl:col-span-3" : ""}`}
            >
              <Link
                href={`/student/blog/${blog.blog_id}`}
                className={`flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${index === 0 ? "lg:grid lg:grid-cols-[1.1fr_1fr]" : ""}`}
              >
                <div
                  className={`overflow-hidden bg-lightLayout ${index === 0 ? "aspect-[16/9] lg:aspect-auto lg:min-h-[340px]" : "aspect-[16/10]"}`}
                >
                  <img
                    loading={index === 0 ? "eager" : "lazy"}
                    src={imageUrl(blog.image_url, "/goals.jpg")}
                    alt=""
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div
                  className={`flex min-w-0 flex-1 flex-col p-6 ${index === 0 ? "lg:justify-center lg:p-10" : ""}`}
                >
                  <span className="mb-4 text-sm font-semibold tracking-wide text-mainClr dark:text-mainClrDark">
                    {index === 0 ? "A FRESH PERSPECTIVE" : "FROM THE JOURNAL"}
                  </span>
                  <h3
                    className={`text-balance font-semibold leading-tight tracking-tight ${index === 0 ? "text-3xl lg:text-4xl" : "text-2xl"}`}
                  >
                    {blog.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                    {blog.subtitle}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-borderLight pt-5 text-sm dark:border-borderDark">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Clock3 aria-hidden="true" className="size-4" />
                        {readingTimeMinutes(blog.content)} min read
                      </span>
                      <span className="inline-flex min-h-11 items-center gap-2 font-semibold text-mainClr dark:text-mainClrDark">
                        Read story
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {isFetching && (
          <div className={blogs.length ? "mt-6" : ""}>
            <BlogSkeleton count={3} />
          </div>
        )}
        {!isFetching && !error && !blogs.length && (
          <div className="rounded-md border border-dashed border-input px-6 py-16 text-center">
            <BookOpen
              aria-hidden="true"
              className="mx-auto mb-5 size-9 text-mainClr dark:text-mainClrDark"
            />
            <h3 className="text-xl font-semibold">
              The next good idea is on its way.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              New stories will appear here. Come back soon for a fresh
              perspective.
            </p>
          </div>
        )}
      </div>
      <FeedStatus
        loading={isFetching}
        error={error}
        empty={!blogs.length}
        hasMore={hasNextPage}
        noun="stories"
        onRetry={isFetchingNextPage || blogs.length ? loadMore : refetch}
        onLoadMore={loadMore}
      />
    </>
  );
}
