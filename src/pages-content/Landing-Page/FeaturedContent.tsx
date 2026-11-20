"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/imageUrl";
import type { LandingContent } from "@/types";
function FeaturedCarousel({
  id,
  title,
  description,
  items,
  href,
}: {
  id: string;
  title: string;
  description: string;
  items: ReactNode[];
  href?: string;
}) {
  const [offset, setOffset] = useState(0);
  const start = Math.min(
    offset,
    Math.max(0, Math.floor((items.length - 1) / 3) * 3),
  );
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto w-[calc(100%-40px)] max-w-7xl py-16 md:w-[calc(100%-56px)] md:py-20 xl:w-[calc(100%-96px)]"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="mb-4 block text-sm font-semibold tracking-wider text-mainClr dark:text-mainClrDark">
            CURATED FOR YOUR NEXT CHAPTER
          </span>
          <h2 id={`${id}-heading`}>{title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {href && (
            <Link
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-mainClr dark:text-mainClrDark"
              href={href}
            >
              Explore all
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          )}
          {items.length > 3 && (
            <>
              <Button
                variant="outline"
                className="size-11"
                aria-label={`Previous ${id === "stories" ? "testimonials" : id === "journal" ? "blog posts" : "courses"}`}
                disabled={start === 0}
                onClick={() => setOffset(Math.max(0, start - 3))}
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                className="size-11"
                aria-label={`Next ${id === "stories" ? "testimonials" : id === "journal" ? "blog posts" : "courses"}`}
                disabled={start + 3 >= items.length}
                onClick={() => setOffset(start + 3)}
              >
                <ArrowRight aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
      </div>
      {items.length ? (
        <>
          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {items.slice(start, start + 3)}
          </div>
          <p role="status" className="mt-5 text-sm text-muted-foreground">
            Showing {start + 1} to {Math.min(start + 3, items.length)} of{" "}
            {items.length}
          </p>
        </>
      ) : (
        <p className="rounded-md border border-dashed border-input p-8 text-sm">
          New picks are on the way. Check back soon.
        </p>
      )}
    </section>
  );
}
const card =
  "flex min-w-0 flex-col overflow-hidden rounded-md border border-borderLight bg-white dark:border-borderDark dark:bg-lightDark/40";
function Cover({ src }: { src: string }) {
  return src ? (
    <img
      src={imageUrl(src)}
      alt=""
      loading="lazy"
      className="aspect-[16/10] w-full object-cover"
    />
  ) : (
    <div className="flex aspect-[16/10] items-center justify-center bg-mainClr/10 text-mainClr dark:text-mainClrDark">
      <BookOpen aria-hidden="true" className="size-12" />
    </div>
  );
}
export default function FeaturedContent({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <>
      <FeaturedCarousel
        id="courses"
        title="Find your next spark."
        description="Practical courses picked to help you take the next step."
        href="/student/allcourses"
        items={content.courses.map((course) => (
          <Link
            key={course.course_id}
            href={`/student/allcourses/${course.course_id}`}
            className={`${card} group`}
          >
            <Cover src={course.image_url} />
            <div className="flex flex-1 flex-col p-6">
              <span className="text-sm font-medium text-mainClr dark:text-mainClrDark">
                {course.category}
              </span>
              <h3 className="mt-3 group-hover:underline">{course.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7">
                {course.description}
              </p>
              <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold">
                <span>
                  {Number(course.price) > 0
                    ? `$${Number(course.price).toFixed(2)}`
                    : "Free"}
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5" />
              </span>
            </div>
          </Link>
        ))}
      />
      <FeaturedCarousel
        id="journal"
        title="Ideas worth exploring."
        description="Fresh perspectives and useful stories from the LearnQuest journal."
        href="/student/blog"
        items={content.blogs.map((blog) => (
          <Link
            key={blog.blog_id}
            href={`/student/blog/${blog.blog_id}`}
            className={`${card} group`}
          >
            <Cover src={blog.image_url} />
            <div className="flex flex-1 flex-col p-6">
              <span className="text-sm font-medium text-mainClr dark:text-mainClrDark">
                FROM THE JOURNAL
              </span>
              <h3 className="mt-3 group-hover:underline">{blog.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7">
                {blog.subtitle}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold">
                Read story
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      />
      <FeaturedCarousel
        id="stories"
        title="A little learning. A lasting difference."
        description="Different goals. Different starting points. A shared love of moving forward."
        items={content.testimonials.map((item) => (
          <figure key={item.content_id} className={`${card} p-6`}>
            <span
              aria-label={`${item.stars} out of 5 stars`}
              className="flex gap-1 text-mainClr dark:text-mainClrDark"
            >
              {Array.from({ length: item.stars }, (_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className="size-4 fill-current"
                />
              ))}
            </span>
            <blockquote className="my-6 flex-1 text-sm leading-8">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="border-t border-input pt-5">
              <strong className="block text-sm">{item.name}</strong>
              <span className="mt-1 block text-sm text-muted-foreground">
                {item.role}
              </span>
            </figcaption>
          </figure>
        ))}
      />
    </>
  );
}
