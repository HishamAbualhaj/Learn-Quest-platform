import PlatformBrand from "./PlatformBrand";

export default function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-16 text-center text-lightText dark:bg-dark dark:text-white"
    >
      <div
        aria-hidden="true"
        className="relative mb-9 flex size-32 items-center justify-center sm:size-40"
      >
        <span className="absolute inset-0 rounded-full border border-mainClr/10 dark:border-mainClrDark/15" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-mainClr motion-safe:animate-spin dark:border-t-mainClrDark" />
        <span className="absolute inset-3 rounded-full border border-dashed border-mainClr/15 dark:border-mainClrDark/20" />
        <span className="flex size-20 items-center justify-center rounded-md bg-mainClr/10 text-mainClr sm:size-24 dark:bg-mainClrDark/10 dark:text-mainClrDark">
          <svg viewBox="0 0 32 32" fill="none" className="size-12 sm:size-14">
            <path d="M7 7h8v10h10v8H7V7Z" fill="currentColor" />
            <path
              d="m20 5 7 7m-7 0 7-7"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </span>
      </div>
      <div className="[&_a]:text-4xl [&_a]:tracking-tight sm:[&_a]:text-5xl [&_svg]:hidden">
        <PlatformBrand />
      </div>
      <p className="mt-7 text-lg font-medium tracking-tight sm:text-xl">
        Getting your next chapter ready.
      </p>
      <p className="mt-3 max-w-sm text-sm leading-7 text-lightText/65 dark:text-textDark">
        Please wait while we get everything ready for you.
        <br />
        Your learning journey will continue in a moment.
      </p>
      <div aria-hidden="true" className="mt-8 flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-mainClr/70 motion-safe:animate-pulse dark:bg-mainClrDark" />
        <span className="size-1.5 rounded-full bg-mainClr/45 motion-safe:animate-pulse [animation-delay:150ms] dark:bg-mainClrDark/65" />
        <span className="size-1.5 rounded-full bg-mainClr/25 motion-safe:animate-pulse [animation-delay:300ms] dark:bg-mainClrDark/35" />
      </div>
      <span className="sr-only">LearnQuest is loading. Please wait.</span>
    </div>
  );
}
