"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "radix-ui";
import { usePathname } from "next/navigation";
interface DropDownProps {
  tabs: { key: number; name: string; icon: IconDefinition; link: string }[];
  setActive: Dispatch<SetStateAction<boolean>>;
}
export default function DropDown({ tabs, setActive }: DropDownProps) {
  const pathname = usePathname();
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align="end"
        sideOffset={8}
        collisionPadding={12}
        className="z-50 w-52 max-w-[calc(100vw-24px)] rounded-md border border-input bg-popover p-1 text-popover-foreground shadow-xl outline-none"
      >
        {tabs.map((tab) => {
          const active =
            pathname === tab.link ||
            pathname?.startsWith(tab.link + "/") ||
            (tab.link === "/student/profile" &&
              ["/student", "/student/editprofile"].includes(pathname ?? ""));
          const logout = tab.link === "/logout";
          return (
            <DropdownMenu.Item
              key={tab.key}
              asChild
              onSelect={() => setActive(false)}
            >
              <Link
                href={tab.link}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-9 w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors ${active ? "bg-primary/10 text-primary" : logout ? "text-red-600 data-[highlighted]:bg-red-500/10 dark:text-red-400" : "text-muted-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"}`}
              >
                <FontAwesomeIcon
                  icon={tab.icon}
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-current"
                />
                <span>{tab.name}</span>
              </Link>
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
