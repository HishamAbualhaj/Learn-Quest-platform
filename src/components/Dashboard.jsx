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
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import Users from "./Users";

function Dashboard() {
  let tabs = [
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
  let [activeStatus, setActiveStatus] = useState("users");

  let [width, setWidth] = useState(false);

  function setActive(e) {
    let currentTab = e.currentTarget
      .querySelector(".data")
      .textContent.toLowerCase();
    setActiveStatus(currentTab);
  }

  let active = `after:absolute after:content[''] after:w-1 after:h-full after:bg-purple-500 after:left-0 bg-hoverDark`;
  return (
    <div className="flex h-[100vh]">
      <div className={`border-r border-borderDark bg-lightDark w-fit`}>
        <div
          className={
            width
              ? "flex items-center justify-center"
              : "flex items-center justify-between px-4 gap-2"
          }
        >
          {width ? (
            ""
          ) : (
            <div className="text-white text-2xl py-5 font-bold flex gap-1">
              LEARN <div className="text-purple-600">QUEST</div>
            </div>
          )}

          <FontAwesomeIcon
            onClick={() => {
              width ? setWidth(false) : setWidth(true);
            }}
            className="cursor-pointer text-white  border-gray-400/90 px-2 py-5  rounded transition hover:bg-gray-400/20"
            rotation={width ? 270 : 90}
            icon={faChevronDown}
          />
          {/* <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /> */}
        </div>
        <div className="tabs-container flex flex-col gap-4">
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
                } ${width ? "justify-center" : ""}`}
              >
                <FontAwesomeIcon className="text-gray-300" icon={tab.icon} />
                {width ? (
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
          <div className="flex justify-between items-center gap-3">
            <div className="text-white uppercase">
              admin dashboard management
            </div>
            <h1 className="text-xl px-5 py-2 rounded-md cursor-pointer bg-gray-500/70 hover:bg-gray-800 hover:text-white transition">
              <a href="">Log out</a>
            </h1>
          </div>
        </div>
        <Users></Users>
      </div>
    </div>
  );
}

export default Dashboard;
