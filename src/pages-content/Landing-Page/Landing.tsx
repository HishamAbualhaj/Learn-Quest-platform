import Image from "next/image";
import Link from "next/link";
import FeaturedContent from "./FeaturedContent";
import useFetchServer from "@/hooks/useFetchServer";
import { API_SERVER_BASE_URL } from "@/config/config";
import type { LandingContent } from "@/types";
import getSession from "@/lib/getSession";
import UserStatus from "./Header/UserStatus";
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Mark() {
  return (
    <span
      className="mr-1.5 inline-flex size-[30px] shrink-0 lg:mr-2 lg:size-[37px] [&_svg]:w-full text-mainClr dark:text-mainClrDark"
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 7h8v10h10v8H7V7Z" fill="currentColor" />
        <path d="m20 5 7 7m-7 0 7-7" stroke="currentColor" strokeWidth="3" />
      </svg>
    </span>
  );
}
const features = [
  [
    "01",
    "Learn from people who do.",
    "Go beyond theory with courses shaped by industry experts and real-world experience.",
    "Expert-led courses",
    "✳",
  ],
  [
    "02",
    "Your goals. Your own path.",
    "Explore subjects that spark your curiosity and build skills that move you forward.",
    "Personalized learning",
    "◎",
  ],
  [
    "03",
    "Make room for your life.",
    "A little before work. A chapter on the weekend. Your next step fits your schedule.",
    "On your schedule",
    "◷",
  ],
  [
    "04",
    "Less watching. More doing.",
    "Put ideas into practice with hands-on exercises, quizzes, and projects that stick.",
    "Practical projects",
    "↗",
  ],
];
export default async function Landing() {
  const [{ loggedIn, userDataServer }, result] = await Promise.all([
    getSession(),
    useFetchServer<LandingContent>(
      `${API_SERVER_BASE_URL}/getLandingContent`,
      null,
      "GET",
    ),
  ]);
  const payload =
    result.status && result.msg && typeof result.msg === "object"
      ? result.msg
      : null;
  const content: LandingContent = {
    courses: Array.isArray(payload?.courses) ? payload.courses : [],
    blogs: Array.isArray(payload?.blogs) ? payload.blogs : [],
    testimonials: Array.isArray(payload?.testimonials)
      ? payload.testimonials
      : [],
    faqs: Array.isArray(payload?.faqs) ? payload.faqs : [],
  };
  const faqs = content.faqs.map((item) => [item.question, item.answer]);
  const user = userDataServer?.[0];
  const startUrl = loggedIn
    ? user?.role === "admin"
      ? "/dashboard"
      : "/student"
    : "/signup";
  return (
    <div
      className="overflow-clip bg-white text-[15px] leading-relaxed text-lightText dark:bg-dark dark:text-white [&_h1]:font-semibold [&_h1]:tracking-[-0.065em] [&_h1]:leading-[1.07] [&_h2]:text-[clamp(32px,3.5vw,48px)] [&_h2]:font-semibold [&_h2]:leading-[1.12] [&_h2]:tracking-[-0.055em] [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:tracking-[-0.035em] [&_p]:text-lightText/65 dark:[&_p]:text-textDark [&_em]:font-editorial [&_em]:font-normal [&_em]:text-mainClr dark:[&_em]:text-mainClrDark [&_section[id]]:scroll-mt-24 [&_a]:touch-manipulation [&_button[data-theme-toggle]]:touch-manipulation [&_summary]:touch-manipulation [&_:is(a,button,summary):focus-visible]:outline-2 [&_:is(a,button,summary):focus-visible]:outline-offset-4 [&_:is(a,button,summary):focus-visible]:outline-mainClr dark:[&_:is(a,button,summary):focus-visible]:outline-mainClrDark motion-reduce:[&_*]:transition-none motion-reduce:[&_*]:animate-none"
      id="home"
    >
      <a
        className="fixed top-2 left-3 z-50 -translate-y-[160%] rounded-md bg-mainClr px-5 py-3 text-white focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <header className="relative z-20 border-b border-borderLight dark:border-borderDark bg-white dark:bg-dark">
        <div className="mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)] flex min-h-[78px] items-center justify-between gap-3 md:min-h-24 lg:gap-6">
          <Link
            href="/"
            className="inline-flex items-center whitespace-nowrap text-[22px] font-bold tracking-[-1.2px] xl:text-[25px] [&>span:not(:first-child)]:font-normal"
            aria-label="LearnQuest home"
          >
            <Mark />
            Learn<span>Quest</span>
            <span className="text-mainClr dark:text-mainClrDark">.</span>
          </Link>
          <nav
            className="hidden gap-7 text-sm font-medium min-[901px]:flex [&_a]:py-3.5 [&_a]:transition-colors [&_a:hover]:text-mainClr dark:[&_a:hover]:text-mainClrDark"
            aria-label="Main navigation"
          >
            <a href="#courses">Explore courses</a>
            <a href="#features">Why LearnQuest</a>
            <a href="#stories">Learner stories</a>
          </nav>
          <div className="ml-auto min-[901px]:ml-0 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:rounded-md [&_a]:px-3 [&_a]:py-2.5 [&_a]:text-sm [&_a:first-child]:border-borderLight dark:[&_a:first-child]:border-borderDark [&_a:first-child]:bg-transparent [&_a:first-child]:text-lightText dark:[&_a:first-child]:text-white [&_a:nth-child(2)]:border-mainClr [&_a:nth-child(2)]:bg-mainClr [&_a:nth-child(2)]:text-white dark:[&_a:nth-child(2)]:border-mainClrDark dark:[&_a:nth-child(2)]:bg-mainClr dark:[&_a:nth-child(2)]:text-white [&_button[data-theme-toggle]]:grid [&_button[data-theme-toggle]]:size-11 [&_button[data-theme-toggle]]:cursor-pointer [&_button[data-theme-toggle]]:place-items-center [&_button[data-theme-toggle]]:rounded-md [&_button[data-theme-toggle]]:border [&_button[data-theme-toggle]]:border-borderLight dark:[&_button[data-theme-toggle]]:border-borderDark md:[&_button[data-theme-toggle]]:ml-3 [&_button[data-theme-toggle]_svg]:size-[18px] [&_button[data-theme-toggle]_svg]:bg-transparent [&_button[data-theme-toggle]_svg]:p-0 [&_button[data-theme-toggle]_svg]:text-lightText dark:[&_button[data-theme-toggle]_svg]:text-white">
            <UserStatus
              isStudent={false}
              isLoggedIn={loggedIn ?? false}
              first_name={user?.first_name ?? ""}
              role={user?.role ?? ""}
              image_url={user?.image_url ?? ""}
            />
          </div>
          <details className="min-[901px]:hidden [&_summary]:grid [&_summary]:size-11 [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:place-items-center [&_summary]:rounded-md [&_summary]:border [&_summary]:border-borderLight dark:[&_summary]:border-borderDark [&_summary::-webkit-details-marker]:hidden [&_nav]:absolute [&_nav]:inset-x-5 [&_nav]:top-full [&_nav]:grid [&_nav]:rounded-md [&_nav]:border [&_nav]:border-borderLight dark:[&_nav]:border-borderDark [&_nav]:bg-white dark:[&_nav]:bg-lightDark [&_nav]:p-4 [&_nav]:shadow-xl [&_a]:p-3 [&_a]:text-sm">
            <summary aria-label="Open navigation">
              <span aria-hidden="true">☰</span>
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="#courses">Explore courses</a>
              <a href="#features">Why LearnQuest</a>
              <a href="#stories">Learner stories</a>
              <Link href={startUrl}>
                {loggedIn ? "My dashboard" : "Get started"}
              </Link>
              {!loggedIn && <Link href="/login">Log in</Link>}
            </nav>
          </details>
        </div>
      </header>
      <main id="main-content">
        <section
          className="grid items-center gap-12 pt-12 pb-16 md:grid-cols-[1.08fr_1fr] md:gap-8 md:py-20 xl:gap-16 xl:pb-24 mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)]"
          aria-labelledby="hero-title"
        >
          <div className="[&>p]:max-w-[430px] [&>p]:text-sm [&>p]:leading-[1.9] lg:[&>p]:text-[15px] [&_h1]:mb-8 [&_h1]:text-[clamp(48px,10vw,72px)] md:[&_h1]:text-[52px] lg:[&_h1]:text-[clamp(52px,5.35vw,80px)] [&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:gap-2 [&>div:first-child]:text-sm xl:[&>div:first-child]:text-sm [&>div:first-child]:tracking-[1.2px]">
            <div className="block text-sm font-semibold tracking-[1.8px] leading-relaxed mb-6 text-mainClr dark:text-mainClrDark">
              <span className="inline-block size-[7px] shrink-0 rounded-md bg-current" />{" "}
              A LITTLE CURIOSITY. A WORLD OF POSSIBILITY.
            </div>
            <h1 id="hero-title">
              Your next
              <br />
              chapter starts
              <br />
              with{" "}
              <span className="relative font-editorial font-normal italic tracking-[-0.055em] [&_svg]:absolute [&_svg]:-bottom-2 [&_svg]:left-0 [&_svg]:h-[13px] [&_svg]:w-full [&_svg]:fill-none [&_svg]:stroke-mainClr dark:[&_svg]:stroke-mainClrDark [&_svg]:stroke-[3]">
                curiosity
                <svg
                  viewBox="0 0 400 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M3 13Q190-3 397 10M30 19Q190 7 365 17" />
                </svg>
              </span>
              <span className="text-mainClr dark:text-mainClrDark">.</span>
            </h1>
            <p>
              Big ambitions start with small steps. Discover practical courses,
              learn from experts, and turn “one day” into day one.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5 lg:gap-6">
              <Link
                href={startUrl}
                className="inline-flex min-h-[53px] items-center justify-center gap-5 rounded-md px-5 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none bg-mainClr text-white dark:bg-mainClr dark:text-white"
              >
                {loggedIn
                  ? "Continue your journey"
                  : "Start your learning journey"}
                <Arrow />
              </Link>
              <a
                href="#courses"
                className="inline-flex min-h-11 items-center gap-4 border-b border-borderLight dark:border-borderDark text-sm font-semibold hover:border-mainClr dark:hover:border-mainClrDark"
              >
                Explore courses <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="mt-7 flex items-center gap-3.5 text-sm leading-relaxed text-lightText/65 dark:text-textDark [&_strong]:font-medium [&_strong]:text-lightText dark:[&_strong]:text-white">
              <span
                className="flex pl-1 [&_b]:-ml-1 [&_b]:grid [&_b]:size-9 [&_b]:place-items-center [&_b]:rounded-md [&_b]:border-[3px] [&_b]:border-white dark:[&_b]:border-dark [&_b]:bg-mainClr/10 dark:[&_b]:bg-mainClrDark/20 [&_b]:text-mainClr dark:[&_b]:text-mainClrDark [&_b]:text-lg"
                aria-hidden="true"
              >
                <b>✦</b>
                <b>↗</b>
                <b>◎</b>
              </span>
              <span>
                For the curious. The ambitious.
                <br />
                <strong>And everyone ready for what’s next.</strong>
              </span>
            </div>
          </div>
          <div className="relative mx-auto w-full min-w-0 max-w-[520px] px-4 pt-4 pb-8 md:pr-1 md:pl-5">
            <div className="relative h-[370px] overflow-hidden rounded-md bg-lightLayout min-[421px]:h-[450px] md:h-[420px] lg:h-[450px] xl:h-[490px] xl:rounded-tl-md [&>img]:object-cover after:absolute after:inset-x-0 after:top-[55%] after:bottom-0 after:bg-gradient-to-t after:from-dark/75 after:to-transparent after:content-['']">
              <Image
                src="/hero.jpg"
                alt="A learner finding focus in a study space"
                fill
                priority
                sizes="(max-width: 760px) 90vw, 46vw"
              />
              <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 text-sm tracking-[1.5px] text-white xl:text-sm">
                <span className="inline-block size-[7px] shrink-0 rounded-md bg-current" />{" "}
                YOUR FUTURE IS A WORK IN PROGRESS.
              </div>
            </div>
            <span
              className="absolute -top-6 -right-1 rotate-[14deg] text-[90px] leading-none xl:-top-9 xl:-right-6 xl:text-[116px] text-mainClr dark:text-mainClrDark"
              aria-hidden="true"
            >
              ✳
            </span>
            <div className="absolute rounded-md border border-borderLight dark:border-borderDark bg-white dark:bg-lightDark shadow-xl shadow-black/10 top-[60px] left-0 w-[195px] -rotate-5 p-5 md:-left-1 md:w-[170px] md:p-4 xl:-left-5 xl:w-[210px] xl:p-5 [&>.block]:text-sm [&>.block]:tracking-wider [&>.block]:text-lightText/65 dark:[&>.block]:text-textDark [&_strong]:my-1.5 [&_strong]:block [&_strong]:text-[25px] [&_strong]:tracking-tight [&>span:not(:first-child)]:text-sm [&>span:not(:first-child)]:text-lightText/65 dark:[&>span:not(:first-child)]:text-textDark [&_small]:text-sm [&_small]:text-lightText/65 dark:[&_small]:text-textDark">
              <span className="block text-sm font-semibold tracking-[1.8px] leading-relaxed">
                THE BEST INVESTMENT?
              </span>
              <strong>You. Always.</strong>
              <span>Build a skill. Open a door.</span>
              <div className="mt-5 h-[5px] overflow-hidden rounded-md bg-lightLayout dark:bg-hoverDark [&_i]:block [&_i]:h-full [&_i]:w-[72%] [&_i]:bg-mainClr dark:[&_i]:bg-mainClrDark">
                <i />
              </div>
              <small>A little progress, every day.</small>
            </div>
            <div className="absolute rounded-md border border-borderLight dark:border-borderDark bg-white dark:bg-lightDark shadow-xl shadow-black/10 right-0 bottom-1.5 flex rotate-3 items-center gap-3.5 p-4 md:-right-2 md:p-3 xl:-right-3 xl:px-5 xl:py-4 [&_strong]:block [&_strong]:text-sm [&_div>span]:text-sm [&_div>span]:text-lightText/65 dark:[&_div>span]:text-textDark">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-md bg-mainClr/10 text-xl text-mainClr dark:bg-mainClrDark/20 dark:text-mainClrDark"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <strong>New skill unlocked</strong>
                <span>Your next chapter is calling.</span>
              </div>
            </div>
            <span className="mt-5 ml-2 block text-sm tracking-[2px] text-lightText/65 dark:text-textDark">
              A NEW PERSPECTIVE STARTS HERE ↗
            </span>
          </div>
        </section>
        <div
          className="border-y border-mainClr/10 bg-mainClr/10 py-6 text-mainClr dark:border-mainClrDark/10 dark:bg-mainClrDark/10 dark:text-mainClrDark [&>div]:flex [&>div]:flex-wrap [&>div]:items-center [&>div]:justify-center [&>div]:gap-x-4 [&>div]:gap-y-3 [&>div]:text-sm [&>div]:font-semibold md:[&>div]:flex-nowrap md:[&>div]:justify-between xl:[&>div]:text-sm [&_i]:text-lg [&_i]:not-italic xl:[&_i]:text-2xl [&_span]:basis-[40%] [&_span]:text-center md:[&_span]:basis-auto max-md:[&_i:nth-of-type(2)]:hidden"
          aria-label="Learn your way"
        >
          <div className="mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)]">
            <span>Small steps. Big possibilities.</span>
            <i aria-hidden="true">✳</i>
            <span>Learn by doing</span>
            <i aria-hidden="true">✳</i>
            <span>At your own pace</span>
            <i aria-hidden="true">✳</i>
            <span>Made for your next move</span>
          </div>
        </div>
        <section
          id="features"
          className="py-16 md:py-20 xl:py-[100px] mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)]"
        >
          <div className="mb-8 flex flex-col items-start justify-between gap-5 md:mb-11 md:flex-row md:items-end md:gap-12 [&>p]:max-w-sm [&>p]:text-sm [&>div+div]:max-w-sm [&>div+div]:text-sm">
            <div>
              <span className="block text-sm font-semibold tracking-[1.8px] leading-relaxed mb-6 text-mainClr dark:text-mainClrDark">
                01 / A BETTER WAY TO LEARN
              </span>
              <h2>
                Built around you.
                <br />
                <span className="text-lightText/65 dark:text-textDark">
                  And where you’re going.
                </span>
              </h2>
            </div>
            <p>
              Learning should open doors, not add obstacles. Here’s how we help
              you keep moving.
            </p>
          </div>
          <div className="grid gap-4 min-[421px]:grid-cols-2 lg:grid-cols-4">
            {features.map(([number, title, body, label, symbol]) => (
              <article
                className="rounded-md border border-borderLight dark:border-borderDark bg-white dark:bg-lightDark p-6 [&_h3]:mb-4 [&_p]:text-sm [&_p]:leading-[1.9] [&>.block]:mb-2.5 [&>.block]:text-sm [&>.block]:tracking-wider [&>.block]:text-lightText/65 dark:[&>.block]:text-textDark"
                key={number}
              >
                <div className="mb-6 flex items-center justify-between xl:mb-8 [&>span+span]:text-sm [&>span+span]:text-lightText/65 dark:[&>span+span]:text-textDark">
                  <span
                    className="text-[34px] leading-none text-mainClr dark:text-mainClrDark"
                    aria-hidden="true"
                  >
                    {symbol}
                  </span>
                  <span>{number}</span>
                </div>
                <span className="block text-sm font-semibold tracking-[1.8px] leading-relaxed">
                  {label}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="py-16 md:py-20 xl:py-[100px] bg-lightLayout dark:bg-lightDark/50">
          <div className="mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)] grid items-center gap-12 md:grid-cols-2 xl:gap-[100px]">
            <div className="relative w-full max-w-[520px] pr-5 pb-16 min-[421px]:pr-10">
              <div className="relative h-[290px] overflow-hidden rounded-md min-[421px]:h-[330px] lg:h-[400px] [&_img]:object-cover">
                <Image
                  src="/goals.jpg"
                  alt="Planning the next steps toward a learning goal"
                  fill
                  sizes="(max-width: 760px) 90vw, 45vw"
                />
              </div>
              <div className="absolute right-0 bottom-0 w-[260px] rounded-md border border-borderLight dark:border-borderDark bg-white dark:bg-lightDark p-6 shadow-lg shadow-black/5 min-[421px]:w-[270px] xl:w-[300px] [&>strong]:mt-2 [&>strong]:mb-5 [&>strong]:block [&>strong]:text-xl [&>strong]:tracking-tight [&>.block]:text-sm [&>.block]:text-lightText/65 dark:[&>.block]:text-textDark">
                <span className="block text-sm font-semibold tracking-[1.8px] leading-relaxed">
                  YOUR NEXT CHAPTER
                </span>
                <strong>From curious to capable.</strong>
                {[
                  "Find your spark",
                  "Build your skills",
                  "Make your next move",
                ].map((step, i) => (
                  <div
                    className="mt-3 flex items-center gap-2.5 text-sm [&>span]:grid [&>span]:size-6 [&>span]:place-items-center [&>span]:rounded-md [&>span]:bg-lightLayout dark:[&>span]:bg-hoverDark [&>span]:text-sm [&:first-of-type>span]:bg-mainClr/10 [&:first-of-type>span]:text-mainClr dark:[&:first-of-type>span]:bg-mainClrDark/20 dark:[&:first-of-type>span]:text-mainClrDark [&_small]:ml-auto [&_small]:text-sm [&_small]:text-mainClr dark:[&_small]:text-mainClrDark"
                    key={step}
                  >
                    <span>{i === 0 ? "✓" : `0${i + 1}`}</span>
                    {step}
                    <small>{i === 0 ? "You’re here" : ""}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-[500px] [&>p]:mt-6 [&>p]:text-sm [&>p]:leading-[1.9]">
              <span className="block text-sm font-semibold tracking-[1.8px] leading-relaxed mb-6 text-mainClr dark:text-mainClrDark">
                02 / PROGRESS WITH PURPOSE
              </span>
              <h2>
                You bring the ambition.
                <br />
                We’ll bring <em>the way forward.</em>
              </h2>
              <p>
                One place to discover your interests, build confidence, and see
                how far you’ve come. A learning journey that feels like yours.
              </p>
              <ul className="my-6 list-none space-y-3.5 p-0 text-sm [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:before:grid [&_li]:before:size-5 [&_li]:before:shrink-0 [&_li]:before:place-items-center [&_li]:before:rounded-md [&_li]:before:border [&_li]:before:border-borderLight dark:[&_li]:before:border-borderDark [&_li]:before:text-sm [&_li]:before:text-mainClr dark:[&_li]:before:text-mainClrDark [&_li]:before:content-['\2713']">
                <li>Find a course that meets you where you are</li>
                <li>Put new ideas into practice as you go</li>
                <li>Keep your learning and progress in one place</li>
              </ul>
              <Link
                href="/student/allcourses"
                className="inline-flex min-h-11 items-center gap-4 border-b border-borderLight dark:border-borderDark text-sm font-semibold hover:border-mainClr dark:hover:border-mainClrDark"
              >
                Find your next step <Arrow />
              </Link>
            </div>
          </div>
        </section>
        {!result.status && (
          <p
            role="alert"
            className="mx-auto max-w-7xl px-5 text-sm text-muted-foreground"
          >
            Featured content is temporarily unavailable. Please try again
            shortly.
          </p>
        )}
        <FeaturedContent content={content} />
        <section
          id="faq"
          className="py-16 md:py-20 xl:py-[100px] mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)] grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14 xl:gap-[100px] [&>div:first-child>p]:mt-6 [&>div:first-child>p]:mb-5 [&>div:first-child>p]:max-w-[300px] [&>div:first-child>p]:text-sm"
        >
          <div>
            <span className="block text-sm font-semibold tracking-[1.8px] leading-relaxed mb-6 text-mainClr dark:text-mainClrDark">
              05 / GOOD QUESTIONS
            </span>
            <h2>
              A little clarity
              <br />
              before you <em>begin.</em>
            </h2>
            <p>
              Curiosity is always welcome here. Let’s clear a few things up.
            </p>
            <a
              href="#courses"
              className="inline-flex min-h-11 items-center gap-4 border-b border-borderLight dark:border-borderDark text-sm font-semibold hover:border-mainClr dark:hover:border-mainClrDark"
            >
              Take a look around <Arrow />
            </a>
          </div>
          <div className="[&_details]:border-b [&_details]:border-borderLight dark:[&_details]:border-borderDark [&_details:first-child]:border-t [&_summary]:flex [&_summary]:min-h-[76px] [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:gap-3 [&_summary]:px-1 [&_summary]:py-4 [&_summary]:text-sm [&_summary]:font-medium [&_summary::-webkit-details-marker]:hidden [&_details[open]_summary]:text-mainClr dark:[&_details[open]_summary]:text-mainClrDark [&_p]:px-7 [&_p]:pb-6 [&_p]:text-sm [&_p]:leading-[1.9]">
            {!faqs.length && (
              <p className="text-sm">
                Answers are on the way. Check back soon.
              </p>
            )}
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span className="text-sm text-lightText/65 dark:text-textDark">
                    0{index + 1}
                  </span>
                  <span>{question}</span>
                  <span
                    className="relative ml-auto size-6 shrink-0 rounded-md border border-borderLight dark:border-borderDark before:absolute before:top-[11px] before:left-[7px] before:h-px before:w-2 before:bg-current before:content-[''] after:absolute after:top-[11px] after:left-[7px] after:h-px after:w-2 after:rotate-90 after:bg-current after:content-[''] in-open:after:rotate-0"
                    aria-hidden="true"
                  />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)] pb-16 xl:pb-24">
          <div className="relative overflow-hidden rounded-md bg-mainClr px-5 py-14 text-center text-white dark:bg-mainClrDark/15 dark:ring-1 dark:ring-mainClrDark/20 lg:px-8 lg:py-16 [&>.block]:text-sm [&>.block]:text-white/85 dark:[&>.block]:text-mainClrDark [&_h2]:text-[clamp(32px,4vw,54px)] [&_em]:text-white dark:[&_em]:text-mainClrDark [&_p]:mt-5 [&_p]:mb-6 [&_p]:text-sm [&_p]:text-white/85 dark:[&_p]:text-textDark">
            <span
              className="pointer-events-none absolute -bottom-12 -left-5 -rotate-15 text-[160px] leading-none text-white/10 lg:text-[230px]"
              aria-hidden="true"
            >
              ✳
            </span>
            <span className="block text-sm font-semibold tracking-[1.8px] leading-relaxed mb-6 text-mainClr dark:text-mainClrDark">
              YOUR NEXT CHAPTER IS WAITING
            </span>
            <h2>
              You don’t have to know it all.
              <br />
              Just be ready to <em>start.</em>
            </h2>
            <p>Follow a spark of curiosity. See where it takes you.</p>
            <Link
              href={startUrl}
              className="inline-flex min-h-[53px] items-center justify-center gap-5 rounded-md px-5 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none bg-white text-mainClr shadow-sm hover:bg-white/90"
            >
              {loggedIn ? "Continue learning" : "Let’s make today day one"}
              <Arrow />
            </Link>
            <span className="mt-6 block text-sm tracking-[1.5px] text-white/80 dark:text-textDark">
              YOUR PACE. YOUR PATH. YOUR POSSIBILITIES.
            </span>
          </div>
        </section>
      </main>
      <footer className="mx-auto w-[calc(100%-40px)] max-w-7xl md:w-[calc(100%-56px)] xl:w-[calc(100%-96px)] pb-6">
        <div className="flex flex-col justify-between gap-5 pb-11 lg:flex-row lg:gap-10 [&_p]:mt-3 [&_p]:text-sm [&_nav]:flex [&_nav]:flex-wrap [&_nav]:items-center [&_nav]:gap-x-5 [&_nav]:gap-y-2 [&_nav]:text-sm lg:[&_nav]:gap-7 [&_nav_a]:inline-flex [&_nav_a]:min-h-11 [&_nav_a]:items-center [&_nav_a]:gap-2 [&_nav_a:hover]:text-mainClr dark:[&_nav_a:hover]:text-mainClrDark">
          <div>
            <Link
              href="/"
              className="inline-flex items-center whitespace-nowrap text-[22px] font-bold tracking-[-1.2px] xl:text-[25px] [&>span:not(:first-child)]:font-normal"
            >
              <Mark />
              Learn<span>Quest</span>.
            </Link>
            <p>A little curiosity can change everything.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#courses">Explore courses</a>
            <a href="#features">Why LearnQuest</a>
            <a href="#faq">FAQs</a>
            <Link href={startUrl}>
              {loggedIn ? "My dashboard" : "Get started"}
              <Arrow />
            </Link>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-borderLight dark:border-borderDark pt-6 text-sm text-lightText/65 dark:text-textDark max-md:[&>span:nth-child(2)]:hidden [&_a]:flex [&_a]:min-h-11 [&_a]:items-center">
          <span>© {new Date().getFullYear()} LearnQuest. Keep growing.</span>
          <span>
            Made for your next chapter. <span aria-hidden="true">↗</span>
          </span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
