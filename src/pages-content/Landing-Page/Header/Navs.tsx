"use client";
import Link from "next/link";
import { useState } from "react";
import { navs } from "@/global/global";
import Button from "../Button";
import ReactDOM from "react-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "@/components/Logo";

const Navs = ({ isStudent, isLoggedIn }) => {
  const [active, setActive] = useState(false);
  const [nav, setNav] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <>
      {!isStudent && (
        <FontAwesomeIcon
          className="text-2xl text-gray-500 cursor-pointer md:hidden! block"
          icon={faBars}
          onClick={() => {
            setNav(!nav);
          }}
        />
      )}
      <Logo />
      {active && <ModalBg setActive={setActive} />}

      {nav && <NavMobile isStudent={isStudent} isLoggedIn={isLoggedIn} />}

      <div className="gap-8 lg:flex hidden">
        {navs.map((nav) => (
          <Link
            href={`${nav.url.toLowerCase()}`}
            key={nav.id}
            onClick={(e) => {
              setActiveNav(e.currentTarget.textContent.trim());
            }}
            className={`text-lg py-5 cursor-pointer px-4 ${
              activeNav === nav.name.trim()
                ? "border-b-4 dark:border-mainClrDark border-mainClr"
                : ""
            } `}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </>
  );
};
function NavMobile({ isStudent, isLoggedIn }) {
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <>
      {!isStudent && (
        <div className="box-shadow-light w-full border_platform all flex max-w-[80%] justify-between flex-col absolute text-black dark:text-white top-[70px] border pb-5 bg-white dark:bg-lightDark rounded-md">
          <div className="flex flex-col">
            {navs.map((nav) => (
              <div
                key={nav.id}
                onClick={(e) => {
                  setActiveNav(e.currentTarget.textContent.trim());
                }}
                className={`text-lg py-3 cursor-pointer px-5 ${
                  activeNav === nav.name.trim()
                    ? "border-b border-borderLight text-mainClr font-bold"
                    : ""
                } `}
              >
                <a href={`${nav.url}`}>{nav.name}</a>
              </div>
            ))}
          </div>
          {!isLoggedIn && (
            <div className="flex max-sm:flex-col w-fit px-5 gap-2 mt-5 ">
              <Button
                props="!dark:text-lightText"
                outlined={true}
                text="Sign up"
                size="lg"
                url="signup"
              />
              <Button
                props="!dark:text-lightText"
                outlined={true}
                text="Join a course"
                size="lg"
                url="login"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
function ModalBg({ setActive }) {
  return ReactDOM.createPortal(
    <div
      onClick={() => {
        setActive(false);
      }}
      className="absolute inset-0 bg-transparent z-10"
    ></div>,
    document.querySelector("body")!
  );
}

export default Navs;
