import type { ReactNode } from "react";
import Link from "next/link";
import PlatformBrand from "@/components/PlatformBrand";
import DarkModeToggle from "@/pages-content/Landing-Page/Header/DarkModeToggle";

export default function AuthShell({
  children,
  title,
  description,
  step,
}: {
  children: ReactNode;
  title: string;
  description: string;
  step: string;
}) {
  return (
    <div className="min-h-dvh bg-white text-lightText dark:bg-dark dark:text-white [&_:is(a,button,input,select):focus-visible]:outline-2 [&_:is(a,button,input,select):focus-visible]:outline-offset-4 [&_:is(a,button,input,select):focus-visible]:outline-mainClr dark:[&_:is(a,button,input,select):focus-visible]:outline-mainClrDark">
      <header className="mx-auto flex min-h-24 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
        <PlatformBrand />
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="hidden text-sm text-lightText/65 hover:text-mainClr sm:block dark:text-textDark"
          >
            Back to exploring ↗
          </Link>
          <DarkModeToggle />
        </div>
      </header>
      <main className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-12 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-10">
        <aside className="relative hidden min-h-[650px] overflow-hidden rounded-md bg-mainClr p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16 dark:bg-lightDark">
          <div
            className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-md border-[60px] border-white/5"
            aria-hidden="true"
          />
          <span className="relative text-sm font-semibold tracking-[2px] text-white/75 dark:text-mainClrDark">
            A LITTLE CURIOSITY. A WORLD OF POSSIBILITY.
          </span>
          <div className="relative py-16">
            <span
              aria-hidden="true"
              className="mb-8 block text-8xl text-white/70 dark:text-mainClrDark"
            >
              ✳
            </span>
            <h2 className="text-[clamp(40px,4vw,64px)] leading-[1.08] font-semibold tracking-[-0.055em]">
              Your next
              <br />
              chapter starts
              <br />
              with <em className="font-editorial font-normal">you.</em>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/80 dark:text-textDark">
              Big ambitions start with small steps. Make space for something
              new, at a pace that feels like yours.
            </p>
          </div>
          <div className="relative border-t border-white/20 pt-7">
            <p className="text-sm font-medium">
              Your pace. Your path. Your possibilities.
            </p>
            <p className="mt-2 text-sm text-white/70 dark:text-textDark">
              Discover courses · Build skills · Keep growing
            </p>
          </div>
        </aside>
        <section className="mx-auto w-full max-w-[480px] self-center py-6 lg:py-10">
          <span className="text-sm font-semibold tracking-[2px] text-mainClr dark:text-mainClrDark">
            {step}
          </span>
          <h1 className="mt-5 text-4xl leading-tight font-semibold tracking-[-0.05em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 mb-8 text-sm leading-7 text-lightText/65 dark:text-textDark">
            {description}
          </p>
          <div className="[&_form]:mt-5 [&_label]:text-sm [&_label]:font-medium                             [&_a]:text-mainClr dark:[&_a]:text-mainClrDark [&_a:hover]:underline [&_form+div]:flex-wrap [&_form+div]:text-sm [&_form+div]:leading-7">
            {children}
          </div>
          <p className="mt-8 border-t border-borderLight pt-5 text-sm tracking-wide text-lightText/55 dark:border-borderDark dark:text-textDark">
            A LITTLE PROGRESS, EVERY DAY.
          </p>
        </section>
      </main>
    </div>
  );
}
