import Link from "next/link";
import { ArrowLeft, ArrowDown, BookOpen, Clock3 } from "lucide-react";
import { imageUrl } from "@/lib/imageUrl";
import { readingTimeMinutes } from "@/lib/readingTime";
import { BlogType, User } from "@/types";
import Comments from "./Comments";
interface BlogPostProps {
  blogData: BlogType | null;
  userData: Partial<User> & { blog_id: string };
}

export default function BlogPost({ blogData, userData }: BlogPostProps) {
  if (!blogData?.title)
    return (
      <div className="mx-auto max-w-4xl py-16 text-center">
        <BookOpen
          aria-hidden="true"
          className="mx-auto mb-5 size-10 text-mainClr dark:text-mainClrDark"
        />
        <h1 className="text-3xl font-semibold tracking-tight">
          This story is not available.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          There are more ideas waiting for you in the journal.
        </p>
        <Link
          href="/student/blog"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-mainClr dark:text-mainClrDark"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to the journal
        </Link>
      </div>
    );
  return (
    <>
      <nav aria-label="Article navigation" className="mb-10">
        <Link
          href="/student/blog"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-mainClr dark:hover:text-mainClrDark"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to the journal
        </Link>
      </nav>
      <article>
        <header className="mx-auto">
          <span className="text-sm font-semibold tracking-wide text-mainClr dark:text-mainClrDark">
            THE LEARNQUEST JOURNAL
          </span>
          <h1 className="mt-5 text-balance text-3xl leading-tight font-semibold tracking-[-0.045em] md:text-5xl">
            {blogData.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {blogData.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-borderLight py-5 text-sm dark:border-borderDark">
            <div className="flex flex-wrap items-center gap-5 text-muted-foreground">
              <span className="flex items-center gap-2">
                <BookOpen
                  aria-hidden="true"
                  className="size-4 text-mainClr dark:text-mainClrDark"
                />
                LearnQuest journal
              </span>
              <span className="flex items-center gap-2">
                <Clock3 aria-hidden="true" className="size-4" />
                {readingTimeMinutes(blogData.content)} min read
              </span>
            </div>
            <a
              href="#comments"
              className="inline-flex min-h-11 items-center gap-2 font-medium text-mainClr dark:text-mainClrDark"
            >
              Join the conversation
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </header>
        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-md border border-borderLight bg-lightLayout dark:border-borderDark dark:bg-lightDark">
          <img
            src={imageUrl(blogData.image_url, "/goals.jpg")}
            alt=""
            className="aspect-16/8 w-full object-cover"
          />
        </div>
        <div
          className="rich-content mx-auto py-10 text-base leading-8 text-lightText/85 dark:text-textDark sm:py-14 [&_p]:my-5 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-lightText dark:[&_h2]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-lightText dark:[&_h3]:text-white [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold [&_a]:text-mainClr dark:[&_a]:text-mainClrDark [&_a]:underline [&_a]:underline-offset-4 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-mainClr dark:[&_blockquote]:border-mainClrDark [&_blockquote]:bg-lightLayout dark:[&_blockquote]:bg-lightDark [&_blockquote]:px-6 [&_blockquote]:py-3 [&_blockquote]:italic [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-md [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-lightLayout dark:[&_pre]:bg-lightDark [&_pre]:p-5 [&_pre]:text-sm [&_code]:break-words [&_code]:text-sm [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-input [&_td]:p-3 [&_th]:border [&_th]:border-input [&_th]:p-3 [&_hr]:my-10 [&_hr]:border-borderLight dark:[&_hr]:border-borderDark [&_strong]:font-semibold [&_strong]:text-lightText dark:[&_strong]:text-white [overflow-wrap:anywhere]"
          dangerouslySetInnerHTML={{ __html: blogData.content ?? "" }}
        />
        <footer className="mx-auto mb-12 flex flex-wrap items-center justify-between gap-4 rounded-md border border-borderLight bg-lightLayout px-5 py-5 text-sm dark:border-borderDark dark:bg-lightDark/40">
          <p className="text-muted-foreground">
            One new perspective can spark your next step.
          </p>
          <Link
            href="/student/blog"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-mainClr dark:text-mainClrDark"
          >
            Explore more stories
            <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
        </footer>
      </article>
      <section
        id="comments"
        aria-labelledby="comments-heading"
        className="mx-auto scroll-mt-8 border-t border-borderLight pt-10 dark:border-borderDark"
      >
        <Comments {...userData} blog_title={blogData.title} />
      </section>
    </>
  );
}
