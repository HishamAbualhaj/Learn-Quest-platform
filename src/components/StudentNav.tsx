"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/student/allcourses", "Explore courses"],
  ["/student/mycourses", "My learning"],
  ["/student/blog", "The journal"],
  ["/student/chat", "Messages"],
  ["/student/profile", "My profile"],
];
export default function StudentNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Student navigation"
      className="flex gap-2 overflow-x-auto py-3 text-sm font-medium"
    >
      {links.map(([href, label]) => {
        const active =
          pathname === href ||
          pathname?.startsWith(href + "/") ||
          (href === "/student/profile" &&
            ["/student", "/student/editprofile"].includes(pathname ?? ""));
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 shrink-0 items-center rounded-md px-4 transition-colors focus-visible:outline-2 focus-visible:outline-mainClr ${active ? "bg-mainClr/10 text-mainClr dark:bg-mainClrDark/15 dark:text-mainClrDark" : "text-lightText/65 hover:bg-lightLayout hover:text-mainClr dark:text-textDark dark:hover:bg-hoverDark"}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
