"use client";
import { useState } from "react";
import Button from "../Button";
import Avatar from "@/components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
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
const UserStatus = ({
  isLoggedIn,
  isStudent,
  first_name,
  role,
  image_url,
}: UserStatusProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className="flex items-center">
      {!isLoggedIn ? (
        <div className="md:flex hidden gap-2">
          <Button outlined={true} text="Sign up" size="lg" url={"signup"} />
          <Button outlined={false} text="Log in" size="lg" url={"login"} />
        </div>
      ) : (
        <div className=" dark:border-borderDark border-borderLight md:px-5 pb-2">
          <div className="relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActive(!active);
              }}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-300/40 dark:hover:bg-gray-200/20  rounded-md p-2"
            >
              <div className=" bg-slate-400/20 rounded-[50%] sm:block hidden">
                <Avatar img={image_url} className={"h-[50px] w-[50px]"} />
              </div>
              <div className="text-lg">
                {!first_name ? "User Name" : first_name}
              </div>
              <FontAwesomeIcon
                className="text-lg text-slate-400 dark:text-white"
                icon={faShare}
                rotation={90}
              />
            </div>
            {active && ///
              (role === "admin" ? (
                <DropDown tabs={adminTabs} setActive={setActive} />
              ) : (
                <DropDown tabs={tabs} setActive={setActive} />
              ))}
          </div>
        </div>
      )}

      <DarkModeToggle />
    </div>
  );
};

export default UserStatus;
