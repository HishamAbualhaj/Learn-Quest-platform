import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import {
  faUsers,
  faPersonChalkboard,
  faChartLine,
  faMessage,
  faTerminal,
  faCircleExclamation,
  faHeadset,
  faChevronDown,
  faBars,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import Users from "./Users";
import Courses from "./Courses";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
import Analytics from "./Analytics";
import Reviews from "./Reviews";
import Chat from "./Chat";
import SystemLog from "./SystemLog";
import Maintenance from "./Maintenance";

import Logo from "../Logo";
function Dashboard() {
  const tabs = [
    {
      key: 1,
      name: "users",
      icon: faUsers,
    },
    {
      key: 2,
      name: "courses",
      icon: faPersonChalkboard,
    },
    {
      key: 3,
      name: "analytics",
      icon: faChartLine,
    },
    {
      key: 4,
      name: "reviews",
      icon: faMessage,
    },
    {
      key: 5,
      name: "chat",
      icon: faHeadset,
    },
    {
      key: 6,
      name: "system log",
      icon: faTerminal,
    },
    {
      key: 7,
      name: "maintenance",
      icon: faCircleExclamation,
    },
  ];

  const [activeStatus, setActiveStatus] = useState(null);

  // by default its not resized
  const [resize, setResize] = useState(false);

  const [isTranslate, setIsTranslate] = useState(false);

  const link = useLocation();

  // change sidebar (active or not) status based on URL
  useEffect(() => {
    const currentLink = link.pathname.split("/")[1];
    setActiveStatus(currentLink);
    setIsTranslate(false);
  }, [link]);

  function setActive(e) {
    const currentTab = e.currentTarget.id;
    setActiveStatus(currentTab);
  }

  let active = `after:absolute after:content[''] after:w-1 after:h-full after:bg-purple-500 after:left-0 dark:bg-hoverDark bg-hoverLight`;
  return (
    <div className="flex h-[100vh]">
      <div
        className={` border-r dark:border-borderDark border-borderLight dark:bg-lightDark bg-white w-fit xl:h-full h-1/2 xl:relative absolute xl:top-0 top-[69px] transition z-10 max-xl:-translate-x-full dark:shadow-none shadow-custom ${
          isTranslate ? "!translate-x-0 " : ""
        }`}
      >
        <div
          className={`xl:flex items-center justify-center hidden ${
            resize ? "" : "px-4 gap-2"
          }`}
        >
          {resize ? (
            ""
          ) : (
            <Logo />
          )}

          <FontAwesomeIcon
            onClick={() => {
              setResize(!resize);
            }}
            className="cursor-pointer dark:text-white text-lightText px-2 py-[26px] rounded transition hover:bg-gray-400/20"
            rotation={resize ? 270 : 90}
            icon={faChevronDown}
          />
        </div>
        <div className="tabs-container flex flex-col gap-4 ">
          {tabs.map((tab) => (
            <Link key={tab.key} to={`/${tab.name.replace(/\s+/g, "")}`}>
              <div
                id={tab.name.replace(/\s+/g, "")}
                key={tab.key}
                className={
                  "flex flex-col gap-5 cursor-pointer dark:hover:bg-hoverDark  hover:bg-hoverLight transition"
                }
                onClick={(e) => {
                  setActive(e);
                }}
              >
                <div
                  className={`flex py-2 px-5 text-lg relative items-center gap-3 ${
                    activeStatus == tab.name.replace(/\s+/g, "") ? active : ""
                  } ${resize ? "justify-center" : ""}`}
                >
                  <FontAwesomeIcon
                    className="dark:text-gray-300 text-lightText"
                    icon={tab.icon}
                  />
                  {resize ? (
                    ""
                  ) : (
                    <div className="dark:text-gray-300 text-lightText data capitalize">
                      {tab.name}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 dark:bg-dark bg-lightLayout">
        <div className="text-white py-3 border-b dark:bg-black/20 dark:border-borderDark border-borderLight xl:px-12 sm:px-10 px-5 ">
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              onClick={() => {
                setIsTranslate(!isTranslate);
              }}
              className="text-2xl cursor-pointer xl:hidden"
              icon={faBars}
            />
            <div className="flex justify-between xl:flex-1 items-center gap-3">
              <div className="dark:text-white text-black uppercase max-sm:hidden">
                admin dashboard management
              </div>
              <h1 className="text-xl px-5 py-2 rounded-md cursor-pointer dark:text-white text-black dark:bg-gray-500 bg-none dark:hover:bg-gray-800 hover:text-white transition text-center">
                <a href="">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </a>
              </h1>
            </div>
          </div>
        </div>

        <div className="xl:px-12 sm:px-10 px-5 mt-12">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/Courses">
              <Route index path="/Courses" element={<Courses />} />
              <Route path="add" element={<AddCourse />} />
              <Route path="edit/:id" element={<EditCourse />} />
            </Route>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/systemlog" element={<SystemLog />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route
              path="*"
              element={
                <h1 className="text-white text-4xl text-center mt-16">
                  Not Found Page
                </h1>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
