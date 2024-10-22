import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faPersonChalkboard,
  faChartLine,
  faMessage,
  faTerminal,
  faCircleExclamation,
  faUserTie,
  faHeadset,
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

  function setActive(e) {
    let currentTab = e.currentTarget
      .querySelector(".data")
      .textContent.toLowerCase();
    setActiveStatus(currentTab);
  }

  let active = `after:absolute after:content[''] after:w-1 after:h-full after:bg-purple-500 after:left-0 bg-hoverDark`;
  return (
    <div className="flex h-[100vh]">
      <div className="border-r border-borderDark bg-lightDark w-[300px]">
        <div className="text-white text-2xl px-5 py-7 font-bold flex gap-1">
          LEARN <div className="text-purple-600">QUEST</div>
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
                className={
                  activeStatus == tab.name
                    ? `flex py-2 px-5 text-lg relative items-center gap-3 ` +
                      active
                    : "flex py-2 px-5 text-lg relative items-center gap-3 "
                }
              >
                <FontAwesomeIcon className="text-gray-300" icon={tab.icon} />
                <div className="text-gray-300 data capitalize">{tab.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-dark">
        <div className="text-white py-3 border-b px-8 bg-black/20 border-borderDark">
          <div className="flex justify-between items-center gap-3">
            <FontAwesomeIcon
              className="text-xl border px-3 py-3"
              icon={faUserTie}
            />
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
