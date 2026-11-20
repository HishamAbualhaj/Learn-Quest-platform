import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlatformBrand from "@/components/brand/PlatformBrand";
import DarkModeToggle from "@/pages-content/Landing-Page/Header/DarkModeToggle";

function MaintenancePage() {
  return (
    <div className="min-h-dvh bg-white text-lightText dark:bg-dark dark:text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-7">
        <PlatformBrand />
        <DarkModeToggle />
      </header>
      <main className="mx-auto flex min-h-[75dvh] max-w-2xl flex-col items-center justify-center px-5 text-center">
        <div className="flex flex-col items-center gap-6 rounded-md border border-borderLight bg-lightLayout px-6 py-16 dark:border-borderDark dark:bg-lightDark md:px-16">
          <FontAwesomeIcon
            icon={faHammer}
            className="size-16 rounded-md bg-mainClr/10 p-4 text-mainClr dark:bg-mainClrDark/15 dark:text-mainClrDark"
          />
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm font-semibold tracking-[2px] text-mainClr dark:text-mainClrDark">
              A LITTLE PAUSE. MORE POSSIBILITIES AHEAD.
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              Making room for
              <br />
              what’s next.
            </h1>
            <p className="mt-5 text-sm leading-7 text-lightText/65 dark:text-textDark">
              LearnQuest is taking a short maintenance break. Please check back
              soon to continue your journey.
            </p>
          </div>
        </div>
        <a
          href="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-md bg-mainClr px-6 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mainClr dark:bg-mainClr dark:text-white"
        >
          Try again ↗
        </a>
      </main>
    </div>
  );
}

export default MaintenancePage;
