import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDashboard } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import Person from "../../assets/Screenshot_1.jpg";
import Avatar from "../Avatar";
import {
  faMessage,
  faPersonChalkboard,
  faRightFromBracket,
  faShare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBlogger } from "@fortawesome/free-brands-svg-icons";
const tabs = [
  {
    key: 1,
    name: "Profile",
    icon: faUser,
  },
  {
    key: 2,
    name: "All Courses",
    icon: faPersonChalkboard,
  },
  {
    key: 3,
    name: "My Courses",
    icon: faPersonChalkboard,
  },
  {
    key: 4,
    name: "Chat",
    icon: faMessage,
  },
  {
    key: 5,
    name: "Blog",
    icon: faBlogger,
  },
  {
    key: 6,
    name: "Log out",
    icon: faRightFromBracket,
  },
];
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
export default function Header({
  data,
  isStudent = false,
  activeDrop = false,
  sendData,
}) {
  const [nav, setNav] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  // controls the dropdown for user
  const [active, setActive] = useState(false);
  const [isLoggedIn, setIsLogged] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (data) {
      if (data.loggedIn) {
        let reDirected = data.loggedIn;
        let [{ first_name, role }] = data.userData;
        setIsLogged(reDirected);
        setRole(role);
        setFirstName(first_name);
      } else {
        setIsLogged(false);
      }
      console.log(data);
    } else {
      setIsLogged(true);
    }
  }, [data]);

  useEffect(() => {
    sendData(active);
  }, [active]);
  useEffect(() => {
    setActive(activeDrop);
  }, [activeDrop]);
  return (
    <div
      onClick={() => {
        setActive(false);
      }}
      className="section relative"
    >
      <div className={`${isStudent ? "" : "max-container"}`}>
        <div className="flex justify-between lg:gap-0 gap-5 items-center">
          {!isStudent && (
            <FontAwesomeIcon
              className="text-2xl text-gray-500 cursor-pointer md:hidden block"
              icon={faBars}
              onClick={() => {
                setNav(!nav);
              }}
            />
          )}
          <Logo />
          {isStudent ? (
            <></>
          ) : (
            <>
              {nav && (
                <NavMobile isStudent={isStudent} isLoggedIn={isLoggedIn} />
              )}
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
                    <a href={`#${nav.name.toLowerCase()}`}>{nav.name}</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/*Check user status if logged in or not */}
          {!isLoggedIn ? (
            <div className="md:flex hidden gap-2 lg:flex-row flex-col">
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
                    <Avatar img={Person} className={"h-[50px] w-[50px]"} />
                  </div>
                  <div className="text-lg">
                    {!firstName ? "Loading data" : firstName}
                  </div>
                  <FontAwesomeIcon
                    className="text-lg text-slate-400 dark:text-white"
                    icon={faShare}
                    rotation={90}
                  />
                </div>
                {active && ///
                  (role === "admin" ? (
                    <div className="shadow-custom z-10 dark:shadow-none w-[250px] flex justify-between flex-col absolute text-black dark:text-white md:left-0 -left-[120%] top-[70px] border dark:border-borderDark pb-5 bg-white dark:bg-lightDark rounded-md">
                      <Link to={`dashboard`}>
                        <div className="flex flex-col">
                          <div
                            className={`flex items-center gap-3 text-lg py-3 px-5 cursor-pointer hover:bg-gray-300/20 dark:hover:bg-gray-200/20`}
                          >
                            <FontAwesomeIcon
                              className="text-gray-400/80 dark:text-white"
                              icon={faDashboard}
                            />
                            <div>Dashboard</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <DropDown />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function DropDown() {
    return (
      <div className="shadow-custom z-10 dark:shadow-none w-[250px] flex justify-between flex-col absolute text-black dark:text-white md:-left-[45px] -left-[120%] top-[70px] border dark:border-borderDark pb-5 bg-white dark:bg-lightDark rounded-md">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            to={`${
              isStudent
                ? tab.name.replace(/\s+/g, "")
                : `${tab.name === 'Log out' ? tab.name.replace(/\s+/g, "") : `student/${tab.name.replace(/\s+/g, "")}` }`
            }`}
          >
            <div key={tab.key} className="flex flex-col">
              <div
                className={`flex items-center gap-3 text-lg py-3 px-5 cursor-pointer hover:bg-gray-300/20 dark:hover:bg-gray-200/20`}
              >
                <FontAwesomeIcon
                  className="text-gray-400/80 dark:text-white"
                  icon={tab.icon}
                />
                <div>{tab.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

function NavMobile({ isStudent, isLoggedIn }) {
  const [activeNav, setActiveNav] = useState("Home");
  return (
    <>
      {isStudent ? (
        <></>
      ) : (
        <div className="box-shadow-light w-full border_platform all flex max-w-[80%] justify-between flex-col absolute text-black dark:text-white top-[70px] border pb-5 bg-white dark:bg-lightDark rounded-md">
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
