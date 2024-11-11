import React, { act, useState } from "react";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const navs = [
  {
    id: 1,
    name: "Home",
    url: "/Home",
  },
  {
    id: 2,
    name: "Features",
    url: "/Home",
  },
  {
    id: 3,
    name: "Courses",
    url: "/Home",
  },
  {
    id: 4,
    name: "Blog",
    url: "/Home",
  },
];
export default function Header() {
  const [nav, setNav] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <div className="dark:bg-dark relative bg-white border-b dark:border-borderDark text-lightText dark:text-white xl:px-0 px-5">
      <div className="max-w-[1600px] mx-auto ">
        <div className="flex md:justify-between lg:gap-0 gap-5 items-center">
          <FontAwesomeIcon
            className="text-2xl text-gray-500 cursor-pointer md:hidden block"
            icon={faBars}
            onClick={() => {
              setNav(!nav);
            }}
          />
          <Logo />
          {nav && <NavMobile />}
          <div className="gap-8 md:flex hidden">
            {navs.map((nav) => (
              <div
                key={nav.id}
                onClick={(e) => {
                  setActiveNav(e.currentTarget.textContent);
                }}
                className={`text-lg py-5 cursor-pointer  px-4 ${
                  activeNav === nav.name.replace(/\s+/g, "")
                    ? "border-b-4 dark:border-mainClrDark border-mainClr"
                    : ""
                } `}
              >
                {nav.name}
              </div>
            ))}
          </div>
          <div className="md:flex hidden gap-2 lg:flex-row flex-col">
            <div className="cursor-pointer border rounded-md dark:border-mainClrDark border-lightBtn text-mainClr dark:text-white px-4 py-2 font-[600]">
              Log in
            </div>
            <div className="cursor-pointer rounded-md border dark:bg-mainClrDark dark:border-mainClrDark border-mainClr bg-mainClr dark:text-black text-white px-4 py-2 font-[600] transition hover:bg-mainClrDark hover:text-black hover:border-mainClrDark">
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavMobile() {
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <>
      <div className="flex max-w-[80%] justify-between flex-col absolute text-black top-[70px] border pb-5 bg-blue-100 rounded-sm">
        <div className="flex flex-col">
          {navs.map((nav) => (
            <div
              key={nav.id}
              onClick={(e) => {
                setActiveNav(e.currentTarget.textContent);
              }}
              className={`text-lg py-3 cursor-pointer px-5 ${
                activeNav === nav.name.replace(/\s+/g, "")
                  ? "border-b border-borderLight text-mainClr font-bold"
                  : ""
              } `}
            >
              {nav.name}
            </div>
          ))}
        </div>
        <div className="flex w-fit px-5 gap-2 mt-5">
          <div className="cursor-pointer border rounded-md dark:border-mainClrDark border-lightBtn text-mainClr  px-4 py-2 font-[600]">
            Log in
          </div>
          <div className="cursor-pointer rounded-md border dark:bg-mainClrDark dark:border-mainClrDark border-mainClr bg-mainClr dark:text-black text-white px-4 py-2 font-[600] ">
            Sign up
          </div>
        </div>
      </div>
    </>
  );
}
