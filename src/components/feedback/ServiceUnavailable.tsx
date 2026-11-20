"use client";
import PlatformBrand from "@/components/brand/PlatformBrand";
import DarkModeToggle from "@/pages-content/Landing-Page/Header/DarkModeToggle";
import { WifiOff } from "lucide-react";

export default function ServiceUnavailable() {
  return (
    <div className="min-h-dvh bg-white text-lightText dark:bg-dark dark:text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-7">
        <PlatformBrand />
        <DarkModeToggle />
      </header>
      <main className="mx-auto flex min-h-[75dvh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <WifiOff
          aria-hidden="true"
          className="mb-8 size-16 rounded-md bg-mainClr/10 p-4 text-mainClr dark:text-mainClrDark"
        />
        <span className="text-sm font-semibold tracking-[2px] text-mainClr dark:text-mainClrDark">
          WE WILL BE BACK SOON
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
          We are temporarily down.
        </h1>
        <p className="mt-6 text-sm leading-7 text-lightText/65 dark:text-textDark">
          We are sorry for the interruption. We will work to get things running
          again as soon as possible. Please try again shortly.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 min-h-12 cursor-pointer rounded-md bg-action px-6 text-sm font-semibold text-action-foreground hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mainClr"
        >
          Try again
        </button>
      </main>
    </div>
  );
}
