"use client";
import { useState } from "react";
import Button from "../Button";
import Avatar from "@/components/shared/Avatar";
import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import DropDown from "./DropDown";
import { tabs, adminTabs } from "@/global/global";
import DarkModeToggle from "./DarkModeToggle";
interface UserStatusProps {
  isStudent: boolean;
  isLoggedIn: boolean;
  first_name: string;
  role: string;
  image_url: string;
}
export default function UserStatus({
  isLoggedIn,
  first_name,
  role,
  image_url,
}: UserStatusProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex min-w-0 items-center gap-2">
      {!isLoggedIn ? (
        <div className="hidden gap-2 md:flex">
          <Button outlined text="Sign up" size="lg" url="/signup" />
          <Button outlined={false} text="Log in" size="lg" url="/login" />
        </div>
      ) : (
        <DropdownMenu.Root modal={false} open={active} onOpenChange={setActive}>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label="Account menu"
              className="flex min-h-10 max-w-[180px] cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-lightText outline-none transition-colors hover:bg-lightLayout focus-visible:ring-2 focus-visible:ring-ring dark:text-white dark:hover:bg-hoverDark"
            >
              <Avatar
                img={image_url}
                className="hidden size-7 shrink-0 sm:block"
              />
              <span className="max-w-24 truncate">
                {first_name || "My account"}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`size-3.5 shrink-0 text-muted-foreground transition-transform ${active ? "rotate-180" : ""}`}
              />
            </button>
          </DropdownMenu.Trigger>
          <DropDown
            tabs={role === "admin" ? adminTabs : tabs}
            setActive={setActive}
          />
        </DropdownMenu.Root>
      )}
      <DarkModeToggle />
    </div>
  );
}
