import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [activeStatus, setActiveStatus] = useState("users");

  // by default its not resized
  const [resize, setResize] = useState(true);

  const [isTranslate, setIsTranslate] = useState(false);

  // Handling side effect for screen resize
  useEffect(() => {
    // checking if we are in small screens
    if (windowWidth <= 1280) {
      setIsTranslate(false);
    } else {
      setIsTranslate(true);
    }

    // each time we resize screen,
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth <= 1280) {
        setIsTranslate(false);
      } else {
        setIsTranslate(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  function setActive(e) {
    const currentTab = e.currentTarget
      .querySelector(".data")
      .textContent.toLowerCase();
    setActiveStatus(currentTab);
  }

  let active = `after:absolute after:content[''] after:w-1 after:h-full after:bg-purple-500 after:left-0 bg-hoverDark`;
  return (
    <div className="flex h-[100vh]">
      <div
        className={`border-r border-borderDark bg-lightDark w-fit xl:h-full h-1/2 xl:relative absolute xl:top-0 top-[69px] transition ${
          isTranslate ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`xl:flex items-center justify-center hidden ${
            !resize ? "" : "px-4 gap-2"
          }`}
        >
          {!resize ? (
            ""
          ) : (
            <div className="text-white text-2xl py-[18px] font-bold flex gap-1">
              LEARN <div className="text-purple-600">QUEST</div>
            </div>
          )}

          <FontAwesomeIcon
            onClick={() => {
              setResize(!resize);
            }}
            className="cursor-pointer text-white border-gray-400/90 px-2 py-[26px] rounded transition hover:bg-gray-400/20"
            rotation={!resize ? 270 : 90}
            icon={faChevronDown}
          />
        </div>
        <div className="tabs-container flex flex-col gap-4 ">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={
                "flex flex-col gap-5 cursor-pointer hover:bg-hoverDark transition"
              }
              onClick={setActive}
            >
              <div
                className={`flex py-2 px-5 text-lg relative items-center gap-3 ${
                  activeStatus == tab.name ? active : ""
                } ${!resize ? "justify-center" : ""}`}
              >
                <FontAwesomeIcon className="text-gray-300" icon={tab.icon} />
                {!resize ? (
                  ""
                ) : (
                  <div className="text-gray-300 data capitalize">
                    {tab.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-dark">
        <div className="text-white py-3 border-b px-8 bg-black/20 border-borderDark">
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              onClick={() => {
                setIsTranslate(!isTranslate);
              }}
              className="text-2xl cursor-pointer xl:hidden"
              icon={faBars}
            />
            <div className="flex justify-between xl:flex-1 items-center gap-3">
              <div className="text-white uppercase max-sm:hidden">
                admin dashboard management
              </div>
              <h1 className="text-xl px-5 py-2 rounded-md cursor-pointer bg-gray-500 hover:bg-gray-800 hover:text-white transition text-center">
                <a href="">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </a>
              </h1>
            </div>
          </div>
        </div>

        <div className="xl:px-16 sm:px-10 px-5 mt-12">
          {/* <Users /> */}
          <Courses />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
