import Link from "next/link";

export default function PlatformBrand() {
  return (
    <Link
      href="/"
      aria-label="LearnQuest home"
      className="inline-flex items-center whitespace-nowrap text-2xl font-semibold tracking-tight text-lightText dark:text-white"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="mr-2 size-9 text-mainClr dark:text-mainClrDark"
        fill="none"
      >
        <path d="M7 7h8v10h10v8H7V7Z" fill="currentColor" />
        <path d="m20 5 7 7m-7 0 7-7" stroke="currentColor" strokeWidth="3" />
      </svg>
      Learn<span className="font-normal">Quest</span>
      <span className="text-mainClr dark:text-mainClrDark">.</span>
    </Link>
  );
}
